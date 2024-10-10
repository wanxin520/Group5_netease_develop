import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export * from "./countStore";
export * from "./user/userStore";
export * from "./musicStore/playStore";
export * from "./musicStore/sourseStore";
export * from "./musicStore/urlStore";
export * from "./musicStore/detailStore";
export default pinia;
