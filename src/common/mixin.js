import {
    debounce
} from './utils';
import BackTop from "../components/content/backTop/BackTop.vue";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
        }
    },
    mounted() {
        // 1.图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh, 100);
        this.itemImgListener = () => {
            refresh();
        };

        this.$bus.$on("itemimageLoad", this.itemImgListener);
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backclick() {
            // this.$refs.scroll.scroll.scrollTo(0,0,1000);
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
        demo(position) {
            this.isShowBackTop = -position.y > 1000;
        }
    },
   
}