import {createApp} from "vue";
import App from "./App.vue";
import {createStore} from "vuex";
import {Task} from "./task";


const store = createStore({
    state() {
        return {
            tasks: [],
            current_task: new Task(),
        }
    },
    mutations: {
        addTask(state) {
            let task = new Task();
        }
    }
})

const app = createApp(App);
app.use(store);
app.mount("#app");