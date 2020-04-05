<template>
    <v-container>
        <v-layout row v-if="!loader && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="text--secondary mb-3">My Ads</h2>
                <v-card class="elevation-12 mb-5 d-flex"
                    v-for="item in myAds"
                        :key="item.id"
                >
                        <v-flex xs4>
                            <v-img :src="item.src" height="170px"></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--secondary">{{item.title}}</h2>
                                <p>{{item.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn  :to="'/ad/' + item.id" class="info">
                                    Open
                                </v-btn>
                            </v-card-actions>
                        </v-flex>

                </v-card>
            </v-flex>

        </v-layout>
        <v-layout v-else-if="!loader && myAds.length === 0">
            <div class="text-center">
            <h2>You have no ads</h2>
            </div>
        </v-layout>
        <v-layout v-else  class="text-center">
            <v-flex class="pt-12">
<v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "AdList",
        computed: {
            ...mapGetters(['myAds']),
            loader() {
                return this.$store.getters.loading
            }
        }    
    }
</script>

<style scoped>

</style>
