<template>
  <v-app>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5"></span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default {
  mounted() {
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState(["users"]),
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "data.name" },
      { text: "Correo electrónico", value: "data.email" },
      { text: "Actions", value: "actions" },
    ],
    editedIndex: "",
    editedItem: {},
  }),

  methods: {
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item.data);
      this.dialog = true;
    },

    async deleteItem({ id }) {
      const db = getFirestore();
      await deleteDoc(doc(db, "usuarios", id));
      this.editedIndex = "";
      this.editedItem = {};
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      try {
        const { editedItem: user, editedIndex } = this;
        const db = getFirestore();

        if (!editedIndex) {
          await addDoc(collection(db, "usuarios"), user);
        } else {
          const userRef = doc(db, "usuarios", editedIndex);
          await updateDoc(userRef, user);
        }
        this.editedIndex = "";
        this.editedItem = {};
        this.close();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
