import Vuex from "vuex";
import { getCurrentUser, updateUserSettings } from "../services/user";

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2023",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2023",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2023",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2023",
      },
    ],
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
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload
    },
    createFileURL(state, paylaod) {
      state.blogPhotoFileURL = paylaod
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview
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
  },
  modules: {},
});
