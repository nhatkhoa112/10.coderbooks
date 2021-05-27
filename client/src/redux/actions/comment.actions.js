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
      payload: res.data.data.post,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

const deleteComment = (commentId, postId) => async (dispatch) => {
  dispatch({ type: types.DELETE_COMMENT, payload: null });
  try {
    const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
    // console.log(res.data);
    dispatch({ type: types.DELETE_COMMENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.DELETE_COMMENT_FAILURE, payload: null });
  }
};

export const commentActions = {
  createComment,
  deleteComment,
};
