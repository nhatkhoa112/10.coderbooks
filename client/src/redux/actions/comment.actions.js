import * as types from '../constants/comment.constants';
import api from '../api';

const createComment = (postId, body) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMMENT, payload: null });
  try {
    const res = await api.post(`/posts/${postId}/comments`, {
      body,
    });
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

export const commentActions = {
  createComment,
};
