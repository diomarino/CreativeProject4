<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <img src="/images/logo.jpg" />
        </router-link>
      </div>
      <div id="side">
        <router-link to="/post">
          <div class="menu-item post">
            <i class="fas fa-user-edit"></i>
            <p>Post</p>
          </div>
        </router-link>
        <router-link to="/search">
          <div class="menu-item">
            <i class="fas fa-search"></i>
            <p>Search</p>
          </div>
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #b84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#brand h1 {
  margin-top: 30px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: right;
  margin-left: 300px;
}

@media only screen and (max-width: 767px) and (min-width: 540px) {
  #side {
    grid-area: side;
    display: flex;
    justify-content: right;
  }
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
  margin-top: 5px;
}

.post {
  margin-right: 50px;
}
</style>
