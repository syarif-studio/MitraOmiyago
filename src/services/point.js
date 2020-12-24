import api from "./api"

export default {
  getPoint: async (userId) =>
    api.post("point_user", {
      userName: "beta",
      keyCode: "beta12345",
      userId
    }),
  usePoint: async (data) =>
    api.post("use_point", { 
      userName: "beta",
      keyCode: "beta12345",
      userId: data.userId,
      nominal: data.nominal,
      type: "order"
    }),
  unusePoint: async (userId) =>
    api.post("unuse_point", {
      userName: "beta",
      keyCode: "beta12345",
      userId: userId,
      type: "order"
    })
}
