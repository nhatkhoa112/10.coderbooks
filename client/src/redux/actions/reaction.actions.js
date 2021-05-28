import * as types from '../constants/reaction.constants';
import api from '../api';

const createReaction = (postId, string) => async (dispatch) => {
  dispatch({ type: types.CREATE_REACTION, payload: null });
  try {
    const res = await api.post(`posts/${postId}/reactions`, { type: string });
    dispatch({
      type: types.CREATE_REACTION_SUCCESS,
      payload: res.data.data.post,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REACTION_FAILURE, payload: null });
    console.log(error);
  }
};

const updateReaction = (postId, reactionId, string) => async (dispatch) => {
  dispatch({ type: types.UPDATE_REACTION, payload: null });
  try {
    const res = await api.patch(`posts/${postId}/reactions/${reactionId}`, {
      type: string,
    });
    dispatch({
      type: types.UPDATE_REACTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_REACTION_FAILURE, payload: null });
    console.log(error);
  }
};

const deleteReaction = (postId, reactionId) => async (dispatch) => {
  dispatch({ type: types.DELETE_REACTION, payload: null });
  try {
    const res = await api.delete(`posts/${postId}/reactions/${reactionId}`);
    dispatch({
      type: types.DELETE_REACTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: types.DELETE_REACTION_FAILURE, payload: null });
    console.log(error);
  }
};

export const reactionActions = {
  createReaction,
  updateReaction,
  deleteReaction,
};
