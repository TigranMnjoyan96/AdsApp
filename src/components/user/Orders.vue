<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-md3>
                <v-list
                        subheader
                        two-line
                        flat
                        class="mt-5"
                        v-for="order in orders"
                        :key="order.id"

                >
<h2 class="text--secondary mb-3" >Orders</h2>
                    <v-list-item-group
                    >
                        <v-list-item>
                            <template>
                                <v-list-item-action>
                                    <v-checkbox
                                            @change="markDone(order)"
                                            :input-value="false"
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
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Orders",
        data() {
            return {
                orders: [
                    {id: 125, name: 'Tigran', phone: '+37493383604', adId: '546', done: true}
                ]
            }
        },
        methods: {
            markDone(order) {
                order.done = true
            }
        }
    }
</script>

<style scoped>

</style>
