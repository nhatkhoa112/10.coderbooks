import * as types from '../constants/reaction.constants';
import api from '../api';

const createReactionInPost =
  (reactionableId, string, reactionableType) => async (dispatch) => {
    dispatch({ type: types.CREATE_REACTION, payload: null });
    try {
      const res = await api.post(`posts/${reactionableId}/reactions`, {
        type: string,
        reactionableId,
        reactionableType,
      });
      dispatch({
        type: types.CREATE_REACTION_SUCCESS,
        payload: res.data.data.reactionableKlass,
      });
    } catch (error) {
      dispatch({ type: types.CREATE_REACTION_FAILURE, payload: null });
      console.log(error);
    }
  };

const updateReactionInPost =
  (postId, reactionId, string) => async (dispatch) => {
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

const deleteReactionInPost = (postId, reactionId) => async (dispatch) => {
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
  createReactionInPost,
  updateReactionInPost,
  deleteReactionInPost,
};
