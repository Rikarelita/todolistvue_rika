<template lang="">
  <b-card>
    <b-card-body>
      <b-input-group>
        <b-input-group-prepend class="mt-1 ml-5" style="margin-right: -80px">
          <span><i class="bi bi-search"></i></span>
        </b-input-group-prepend>
        <b-form-input
          class="form-control col-10 mx-auto"
          type="search"
          v-model="searchQuery"
          placeholder="Search name"></b-form-input>
      </b-input-group>
    </b-card-body>

    <b-card-body>
      <b-card-group>
        <b-card-body v-for="row in resultQuery" :key="row.key">
          <b-card>
            <b-card-title>
              <div class="float-left">
                <small
                  ><b>
                    <h4>{{ row.name }}</h4>
                  </b>
                </small>
              </div>
              <div class="float-right">
                <router-link
                  :to="{ name: 'detail-data', params: { id: row.key } }"
                  id="actionic">
                  <b-button pill variant="success">detail</b-button>
                </router-link>
                <router-link
                  :to="{ name: 'edit-data', params: { id: row.key } }"
                  id="actionic">
                  <b-button pill variant="info">edit</b-button>
                </router-link>

                <b-button @click="deleteData(row.key)" pill variant="danger">hapus</b-button>
                
              </div>
            </b-card-title>
            <div class="float-left container text-justify">
              <b-card-body>
                {{ row.description }}
              </b-card-body>
            </div>
            <small class="text-muted float-right"
              >created {{ row.create_at }}
            </small>
          </b-card>
        </b-card-body>
      </b-card-group>
    </b-card-body>
  </b-card>
</template>

<script>
import { db } from "../firebaseDb";
export default {
  name: "home-page",
  data() {
    return {
      todolist: [],
      list: {
        name: "",
        description: "",
        create_at: "",
      },
      nameState: null,
      descriptionState: null,
      create_atState: null,

      searchQuery: null,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    deleteData(id) {
      if (window.confirm("Yakin ingin hapus?")) {
        db.collection("todolist")
          .doc(id)
          .delete()
          .then(() => {
            this.makeToast("danger");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    loadData() {
      db.collection("todolist").onSnapshot((snapshotChange) => {
        this.todolist = [];
        snapshotChange.forEach((doc) => {
          this.todolist.push({
            key: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            create_at: doc.data().create_at,
          });
        });
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Data deleted", {
        title: `Delete todolist`,
        variant: variant,
        solid: true,
      });
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.todolist.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.todolist;
      }
    },
  },
};
</script>