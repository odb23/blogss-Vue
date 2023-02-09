import Vuex from "vuex";
import { getBlogPosts } from "../services/post";
import { getCurrentUser, updateUserSettings } from "../services/user";

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: false,
    editPost: false,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },getters: { 
    blogPostFeeds(state) {
      return state.blogPosts.slice(0,2);
    },
    blogPostCards(state) {
      return state.blogPosts.slice(2,6);
    }
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, paylaod) {
      state.blogPhotoFileURL = paylaod;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    updateFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    updateLastName(state, payload) {
      state.profileLastName = payload;
    },
    updateUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      await getCurrentUser(commit);
    },
    async updateUserSettings({ commit, state }) {
      await updateUserSettings(commit, state);
    },
    async getPosts({ state }) {
      await getBlogPosts(state)
    },
  },
  modules: {},
});
