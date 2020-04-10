<template>
  <div class="home">
    <div class="problem-container">
      <div class="problem" v-for="problem in problems" :key="problem.id">
        <h1>{{problem.title}}</h1>
        <div class="problem-description">
          <p>{{problem.description}}</p>
        </div>
        <div class="problem-image">
          <img class="image1" :src="problem.path" />
        </div>
        <div class="problem-solution1" v-if="problem.solution === ''">
          <p>No solutions for problem yet</p>
        </div>
        <div class="problem-solution2" v-else>
          <p>{{problem.solution}}</p>
        </div>
      </div>
    </div>
    <div>
      <h2>
        <a href="https://github.com/diomarino/CreativeProject4.git">GitHub</a>
      </h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      problems: []
    };
  },
  created() {
    this.getProblems();
  },
  methods: {
    async getProblems() {
      try {
        let response = await axios.get("/api/problems");
        this.problems = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
html {
  background-color: #edefee;
}

h1 {
  font-family: "Oswald", sans-serif;
  text-decoration: underline;
}

.problem-container {
  display: flex;
  flex-direction: column;
}

.problem-description {
  width: 650px;
  height: 200px;
  border: 1px solid rgb(148, 146, 146);
}

.problem-image {
  margin-top: 20px;
}

.image1 {
  width: 900px;
  height: 500px;
}

.problem-solution1,
.problem-solution2 {
  margin-top: 15px;
  width: 650px;
  height: 200px;
  border: 1px solid rgb(148, 146, 146);
}

h2 {
  text-align: center;
  font-family: "Oswald", sans-serif;
}
</style>
