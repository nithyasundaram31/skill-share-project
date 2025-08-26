import instance from "./instance"

const bookmarkServices = {
  toggleBookmark: async (id, userId) => {
  return await instance.post(`/bookmark/toggle/${id}`, { userId: userId });   //if single filed  we have to send ({ userId })
},

  getUserBookmarks: async (id) => {
    return await instance.get(`/bookmark/user/${id}`);
  }
}

export default bookmarkServices;
