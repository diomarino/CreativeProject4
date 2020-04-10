<template>
  <div class="edit">
    <h1>Search asked question</h1>
    <label>Title</label>
    <div class="form">
      <input v-model="findTitle" placeholder="Search" />
      <div class="suggestions" v-if="suggestions.length > 0">
        <div
          class="suggestion"
          v-for="s in suggestions"
          :key="s.id"
          @click="selectProblem(s)"
        >{{ s.title }}</div>
      </div>
    </div>
    <div class="found-problem" v-if="findProblem">
      <div class="problem">
        <h2>{{ findProblem.title }}</h2>
        <div class="problem-description">
          <p>{{ findProblem.description }}</p>
        </div>
        <div class="problem-image">
          <img :src="findProblem.path" />
        </div>
      </div>
      <div class="solution">
        <div>
          <div v-if="findProblem.solution === ''">
            <textarea v-model="solution" placeholder="Add solution/comment" />
            <div class="upload-button">
              <button @click="addSolution(findProblem)">Add</button>
              <button class="delete-button1" @click="deleteProblem(findProblem)">Delete</button>
            </div>
          </div>
          <div v-else>
            <div class="problem-solution">
              <p>{{findProblem.solution}}</p>
            </div>
            <div class="actions">
              <button @click="deleteProblem(findProblem)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      problems: [],
      findTitle: "",
      findProblem: null,
      solution: ""
    };
  },
  created() {
    this.getProblems();
  },
  methods: {
    async getProblems() {
      try {
        let response = await axios.get("/api/problems");
        console.log(response.data);
        this.problems = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectProblem(problem) {
      this.findTitle = "";
      this.findProblem = problem;
    },
    async addSolution(problem) {
      try {
        await axios.put("/api/problems/" + problem._id, {
          solution: this.solution
        });
        this.findProblem = null;
        this.getProblems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProblem(problem) {
      try {
        await axios.delete("/api/problems/" + problem._id);
        this.findProblem = null;
        this.getProblems();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    suggestions() {
      let problems = this.problems.filter(problem =>
        problem.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return problems.sort((a, b) => a.title > b.title);
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
}

h2 {
  font-family: "Oswald", sans-serif;
}

input {
  width: 650px;
  height: 30px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid rgb(148, 146, 146);
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #e0574f;
  color: #fff;
}

.problem-description {
  width: 650px;
  height: 200px;
  border: 1px solid rgb(148, 146, 146);
}

.problem-image {
  margin-top: 30px;
}

.solution {
  margin-top: 30px;
}

textarea {
  width: 650px;
  height: 200px;
}

.problem-solution {
  width: 650px;
  height: 200px;
  border: 1px solid rgb(148, 146, 146);
}

img {
  width: 900px;
  height: 650px;
}

.actions {
  margin-top: 15px;
}

.delete-button1 {
  margin-left: 10px;
}
</style>

//Test your solution //Finish home
