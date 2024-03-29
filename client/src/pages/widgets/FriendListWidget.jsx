import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFriends, selectIsToken, selectUser } from '../../redux/selectors';
import { setFriends } from '../../redux/slice';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const user = useSelector(selectUser);
  const token = useSelector(selectIsToken);
  const friends = useSelector(selectFriends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map(friend => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
