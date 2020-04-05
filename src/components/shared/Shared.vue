<template>
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn class="success ml-1" dark v-on="on">Buy</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
            <h2>Do you want to buy?</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-text-field
                                label="Your Name"
                                name="name"
                                type="text"
                                v-model="name"/>
                                    <v-text-field
                                label="Your Phone"
                                name="phone"
                                type="text"
                                v-model="phone"/>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="danger" @click="dialogDis" :disabled="localLoading">Close</v-btn>
          <v-btn class="success"  @click="dialogAgree" :disabled="localLoading" :loading="localLoading">Buy It!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Share',
    props: ['ad'],
    data() {
        return {
            dialog: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
            dialogDis() {
                this.name = ''
                this.phone = ''
                this.dialog = false
            },
            dialogAgree() {
                if(this.name !== '' && this.phone !== '') {
                    this.localLoading = true
                    console.log(this.ad.ownerId)
            this.$store.dispatch('CREATE_ORDER', {
                name: this.name,
                phone: this.phone,
                adId: this.ad.id,
                ownerId: this.ad.ownerId
             })
             .finally(() => {
                 this.name = '',
                 this.phone = '',
                 this.localLoading = false,
                this.dialog = false

             })
                }
            }
        },
}
</script>
