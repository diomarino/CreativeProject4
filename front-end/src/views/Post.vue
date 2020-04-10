<template>
  <div class="post">
    <h1>Ask a public question</h1>
    <label>Title</label>
    <div class="add">
      <div class="form">
        <input
          style="width: 650px; height: 30px"
          v-model="title"
          placeholder="Be specific and imagine you’re asking a question to another person"
        />
      </div>
    </div>
    <div>
      <div>
        <label>Description</label>
        <div class="text-area">
          <textarea
            v-model="description"
            placeholder="Include all the information someone would need to answer your question"
            class="description-box"
          />
        </div>
      </div>
    </div>
    <label>Add screenshot of code/problem:</label>
    <div class="choose-file">
      <input type="file" name="photo" @change="fileChanged" />
    </div>
    <div class="upload-button">
      <button @click="upload">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Post",
  data() {
    return {
      title: "",
      description: "",
      file: null,
      addProblem: null,
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/problems", {
          title: this.title,
          description: this.description,
          path: r1.data.path,
        });
        this.addProblem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
}

h2 {
  font-family: "Oswald", sans-serif;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}
.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}
.add,
.edit {
  display: flex;
}

.add {
  margin-bottom: 30px;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}
.form {
  margin-right: 50px;
}

.text-area {
  margin-top: 0px;
  margin-bottom: 30px;
}

textarea {
  width: 650px;
  height: 200px;
}

.upload-button {
  margin-top: 30px;
}

.choose-file {
  margin-top: 5px;
}
</style>
