import * as types from '../constants/post.constants';
import * as commentTypes from '../constants/comment.constants';

const initialState = {
  posts: [],
  totalPageNum: 1,
  selectedBlog: {},
  loading: false,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let idu, idz;
  switch (type) {
    case commentTypes.UPDATE_COMMENT:
    case commentTypes.DELETE_COMMENT:
    case commentTypes.CREATE_COMMENT:
    case types.GET_POSTS_BY_USER:
    case types.POST_REQUEST:
    case types.CREATE_POST_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_POST_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_POST_REQUEST:
      return { ...state, loading: true };

    case types.GET_POSTS_BY_USER_SUCCESS:
      return { ...state, loading: false, posts: [...payload.posts] };

    case types.POST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload.posts,
        totalPageNum: payload.totalPages,
      };
    case commentTypes.CREATE_COMMENT_SUCCESS:
      let idx = state.posts.findIndex((post) => post._id === payload._id);
      state.posts[idx] = payload;

      return { ...state, loading: false, posts: [...state.posts] };

    case types.GET_SINGLE_POST_REQUEST_SUCCESS:
      return { ...state, selectedBlog: payload.posts[0], loading: false };

    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: payload,
      };
    case commentTypes.UPDATE_COMMENT_FAILURE:
    case commentTypes.DELETE_COMMENT_FAILURE:
    case commentTypes.CREATE_COMMENT_FAILURE:
    case types.GET_POSTS_BY_USER_FAILURE:
    case types.CREATE_POST_FAILURE:
    case types.UPDATE_POST_FAILURE:
    case types.DELETE_POST_FAILURE:
    case types.POST_REQUEST_FAILURE:
    case types.GET_SINGLE_POST_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };

    case commentTypes.UPDATE_COMMENT_SUCCESS:
      idu = state.posts.findIndex((post) => post._id === payload.post);
      let idz = state.posts[idu].comments.findIndex(
        (comment) => comment._id === payload._id
      );
      state.posts[idu].comments[idz] = payload;
      return {
        ...state,
        loading: false,
        posts: [...state.posts],
      };

    case types.DELETE_POST_SUCCESS:
      state.posts = state.posts.filter((post) => post._id !== payload._id);
      return {
        ...state,
        posts: [...state.posts],
        loading: false,
        selectedBlog: {},
      };

    case commentTypes.DELETE_COMMENT_SUCCESS:
      let ids = state.posts.findIndex((post) => post._id === payload.post);
      state.posts[ids].comments = state.posts[ids].comments.filter(
        (comment) => comment._id !== payload._id
      );

      return {
        ...state,
        loading: true,
        posts: [...state.posts],
      };

    case types.SEND_REACTION_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitLoading: true };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };

    case types.POST_REACTION_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
      };

    case types.REVIEW_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [
            ...state.selectedBlog.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        submitLoading: false,
      };

    case types.SEND_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitLoading: false };
    default:
      return state;
  }
};

export default postReducer;
