<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 class="text-center pt12" v-if="loader">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
            <v-flex xs12 sm6 offset-md3 v-else-if="!loader && orders.length !== 0">
                <h2 class="text--secondary mb-3" >Orders</h2>

                <v-list
                        subheader
                        two-line
                        flat
                        class="mt-5"
                        v-for="order in orders"
                        :key="order.id"

                >
                    <v-list-item-group
                    >
                        <v-list-item>
                            <template>
                                <v-list-item-action>
                                    <v-checkbox
                                            @change="markDone(order)"
                                    ></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                    <v-list-item-title>{{order.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                                </v-list-item-content>

                                    <v-btn :to="'/ad/' + order.adId" class="primary">open</v-btn>
                            </template>

                        </v-list-item>



                    </v-list-item-group>
                </v-list>
            </v-flex>
            <v-flex xs12 class="text-center" v-else>
                <h2 class="text--primary">You have no orders</h2>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Orders",
        computed: {
            loader() {
                return this.$store.getters.loader
            },
            orders() {
                return this.$store.getters.orders
            }
        },
        methods: {
            markDone(order) {
                this.$store.dispatch('MARK_DONE_ORDER', order.id)
                    .then(() => {
                        order.done = true
                    })
                    .catch(() => {})
            }
        },
        created() {
            this.$store.dispatch('FETCH_ORDERS')
        }
    }
</script>

<style scoped>

</style>
