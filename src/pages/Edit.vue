<template>
    <div class="card col-md-9 mx-auto">
        <h4 id="tool">
            Edit Data
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
                        style="
                            box-sizing: border-box;
                            border: 1px solid #aaa;
                            font-size: 1rem;
                            width: 100%;
                            padding: 0.5rem 1rem;
                        "
                        prepend="&#9998;"
                        v-model="list.name"
                        :state="nameState"
                        placeholder="masukkan nama"
                        required />
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="description-input"
                    invalid-feedback="description is required"
                    :state="descriptionState">
                    <b-textarea
                        style="
                            box-sizing: border-box;
                            border: 1px solid #aaa;
                            font-size: 1rem;
                            width: 100%;
                            padding: 0.5rem 1rem;
                        "
                        id="name-input"
                        v-model="list.description"
                        :state="descriptionState"
                        placeholder="Masukkan deskripsi"
                        required></b-textarea>
                </b-form-group>
                <b-form-group
                    label="Date"
                    label-for="description-input"
                    invalid-feedback="create_at is required"
                    :state="create_atState">
                    <b-form-datepicker
                        style="
                            box-sizing: border-box;
                            border: 1px solid #aaa;
                            font-size: 1rem;
                            width: 100%;
                            padding: 0.5rem 1rem;
                        "
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
    name: "edit-data",
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
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            this.create_atState = valid;
            this.descriptionState = valid;

            return valid;
        },

        getOneData(data) {
            this.list.key = data.key;
            this.list.name = data.name;
            this.list.description = data.description;
            this.list.create_at = data.create_at;

            this.$refs["modal-edit"].show();
        },

        makeToast(variant = null) {
            this.$bvToast.toast("Data berhasil di edit", {
                title: `Edit todolist`,
                variant: variant,
                solid: true,
            });
        },

        handleUpdate() {
            if (!this.checkFormValidity()) {
                return;
            }
            db.collection("todolist")
                .doc(this.$route.params.id)
                .update(this.list)
                .then(() => {
                    this.makeToast("warning");
                    delete this.list.key;
                    this.$refs["modal-edit"].hide();

                    // reset form value
                    this.list.name = "";
                    this.list.description = "";
                    this.list.create_at = "";

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
