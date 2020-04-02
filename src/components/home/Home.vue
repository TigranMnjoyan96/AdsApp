<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(item,i) in promoAds"
                                :key="i"
                                :src="item.src"
                                reverse-transition="fade-transition"
                                transition="fade-transition"
                        >
                            <div class="carousel__link">
                                <v-btn class="error" :to="'/ad/' + item.id">
                                    {{item.title}}
                                </v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>

            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex v-for="item in ads"
                        :key="item.id" class="d-flex flex-wrap md4 sm6 xs12">
                    <v-card

                    >
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="item.src"
                        >
                            <v-card-title>{{item.title}}</v-card-title>
                        </v-img>

                        <v-card-subtitle class="pb-0">{{item.length}}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{item.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                    color="blue"
                                    text
                            >
                                Share
                            </v-btn>

                            <v-btn
                                    color="orange"
                                    text
                            >
                                Buy
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout>
                <v-flex xs12 class="text-center pt-12">
<v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>


                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

    export default {
        name: "Home",
        computed: {
            ...mapGetters(['ads', 'promoAds']),
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>
    .carousel__link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .5);
        transform: translate(-50%, 0);
        padding: 10px 20px;
    }
</style>
