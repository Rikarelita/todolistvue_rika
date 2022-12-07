<template lang="">
    <div class="card">
        <h4 id="tool">
            Detail Data
        </h4>
        <div class="card-body">
            <b-list-group>
                <b-list-group-item>
                    <b>Name:</b> {{ list.name }}
                </b-list-group-item>
                <b-list-group-item class="">
                    <b>Description:</b> {{ list.description }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Create_at:</b> {{ list.create_at }}
                </b-list-group-item>
            </b-list-group>
        </div>
        <div>
            <router-link to="/" class="btn btn-warning">Kembali</router-link>
        </div>
    </div>
</template>
<script>
import { db } from "@/firebaseDb";
export default {
    name: "detail-data",
    data() {
        return {
            todolist: [],
            list: {
                name: "",
                description: "",
                create_at: "",
            },
        };
    },
    created() {
        let dbRef = db.collection("todolist").doc(this.$route.params.id);
        dbRef
            .get()
            .then((doc) => {
                this.list = doc.data();
                console.log(this.list);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>
