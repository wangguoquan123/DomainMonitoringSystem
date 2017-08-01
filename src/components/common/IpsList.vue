<template>
    <div class="ips-list">
        <div v-for='(ipsItem, index) in ipsLength' v-if="isShow ? index + 1 < 3 : index + 1">
            {{ ipsItem }}
        </div>
        <p class="ibagese" @click='ipsToggles' v-if='ipsLength.length>2'><i class="fa" :class='[isShow ? faChevronDown : faChevronUp]'></i></p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 isShow: true,
                 faChevronDown:'fa-chevron-down',
                 faChevronUp:'fa-chevron-up'
            }
        },
        props:['ipsLength'],
        methods:{
            ipsToggles() {
                this.isShow = !this.isShow
            }
        }

    }
</script>