<template>
    <div id="ips-list">
        <div v-for='(ipsItem,index) in ipsLength'>
            <p  v-if='isShow'>{{ index < 2 ? ipsItem : ''}}</p>
            <p  v-else>{{ ipsItem }}</p>
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