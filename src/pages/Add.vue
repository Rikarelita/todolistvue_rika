<template>
    <div class="card">
        <h4 id="title">
            Tambah Data
        </h4>
        <div class="card-body">
            <!-- form add start-->
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    label="Name"
                    label-for="name-input"
                    invalid-feedback="Name
                    is required"
                    :state="nameState">
                    <b-form-input
                        prepend="&#9998;"
                        v-model="list.name"
                        :state="nameState"
                        placeholder="Masukkan nama"
                        required />
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="description-input"
                    invalid-feedback="description is required"
                    :state="descriptionState">
                    <b-textarea
                        id="name-input"
                        v-model="list.description"
                        :state="descriptionState"
                        placeholder="masukkan deskripsi"
                        required>
                    </b-textarea>
                </b-form-group>
                <b-form-group
                    label="Date"
                    label-for="create_at-input"
                    invalid-feedback="created_at is required"
                    :state="create_atState">
                    <b-form-datepicker
                        id="name-input"
                        type="date"
                        v-model="list.create_at"
                        :state="create_atState"
                        required></b-form-datepicker>
                </b-form-group>
                <b-form-group>
                    <input type="submit" value="Submit" />
                </b-form-group>
            </form>
            <!-- form add end -->
        </div>
    </div>
</template>
<script>
import { db } from "@/firebaseDb";
export default {
    name: "add-data",
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
        };
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.descriptionState = valid;
            this.create_atState = valid;

            return valid;
        },

        makeToast(variant = null) {
            this.$bvToast.toast("Data berhasil disimpan", {
                title: `Create todolist`,
                variant: variant,
                solid: true,
            });
        },

        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            // Push the name to submitted names
            db.collection("todolist")
                .add(this.list)
                .then(() => {
                    this.makeToast("success");

                    this.list.name = "";
                    this.list.description = "";
                    this.list.create_at = "";
                    this.nameState = null;
                    this.descriptionState = null;
                    this.create_atState = null;
                    this.loadData();
                })
                .catch((err) => {
                    console.log(err);
                });
            this.$router.push({ name: "home-page" });
        },
    },
};
</script>
