import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { Rating, TextField, Button, Box, Typography, Paper, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Listen for comments
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    });

    return () => {
      unsubscribe();
      unsubscribeComments();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        text: newComment,
        rating: rating,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        timestamp: serverTimestamp()
      });

      setNewComment('');
      setRating(0);
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {user ? (
        <Paper sx={{ p: 2, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
                icon={<StarIcon fontSize="inherit" />}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!newComment.trim() || rating === 0}
            >
              Post Comment
            </Button>
          </form>
        </Paper>
      ) : (
        <Typography sx={{ mb: 3 }} color="text.secondary">
          Please login to leave a comment
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments.map((comment) => (
          <Paper key={comment.id} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                src={comment.userPhoto}
                alt={comment.userName}
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle1">{comment.userName}</Typography>
            </Box>
            <Rating
              value={comment.rating}
              readOnly
              precision={0.5}
              icon={<StarIcon fontSize="inherit" />}
            />
            <Typography sx={{ mt: 1 }}>{comment.text}</Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.timestamp?.toDate().toLocaleDateString()}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Comments; 