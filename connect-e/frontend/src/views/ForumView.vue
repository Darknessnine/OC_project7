<template>
  <div>
    <NavComp></NavComp>

    <div class="backdrop">
      <div class="formBackDrop">
        <form>
          <label> New post </label>
          <input type="text" v-model="text" />

          <label> Upload File </label>
          <input type="file" ref="file" @change="selectFile" />
          <button class="createPost_button" @click.prevent="sendfile()"   v-if="text || file">
            Create Post
          </button>
        </form>
      </div>

      <div
        class="post_body"
        v-for="post in posts"
        :key="post.PostID"
        ref="post.PostID"
        @click="handleClick(post)"
      >
        <div class="post_userInfo">
          <div class="hasNotSeenPost" v-bind:id="post.PostID"  :class="{'hasSeenPost': seenPosts.includes(post.PostID)}" ></div>
          <div class="post_username">Username: {{ post.Username }}</div>
        </div>
        <div class="post_text_box">
          <div class="post_text">{{ post.Text }}</div>
        </div>
        <div class="post_image_body">
          <img class="post_image" :src="post.ImageUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavComp from "../components/NavComp.vue";
export default {
  name: "App",
  components: { NavComp },
  data() {
    return {
      text: "",
      file: "",
      filename: "",
      username:sessionStorage.getItem('username'),
      posts: [],
      seenPosts: [],
    };
  },
  methods: {
    sendpost(filename) {
      this.filename = filename;
      let sentpost = {
        username: this.username,
        text: this.text,
        filename: this.filename,
      } 
      fetch("http://localhost:3000/api/post/uploadpost", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentpost),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.getPosts();
          this.text = '';
          this.file.value= null;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    async sendfile() {
      const formData = new FormData();
      formData.append("file", this.file);

      try { 
        if (this.file){
          await axios
          .post("http://localhost:3000/api/post/uploadfile", formData)
          .then((res) => {
            this.filename = res.data;
            this.sendpost(this.filename);
            this.getPosts();
          });
        } else{
          this.sendpost('none');
        }
      } catch (err) {
        console.log(err);
      }
    },
    getPosts() {
      axios
        .get("http://localhost:3000/api/post/get", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.status === "200") {
            this.posts = response.data.data;
            console.log(this.posts);
            this.$router.push('/forum')
          } else {
            console.log(response.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },


    handleClick(post){
      let ID = post.PostID;
      console.log(ID)
      let tempHasSeen = localStorage.getItem("seenposts")
      if(tempHasSeen == null){
      this.seenPosts.push(ID);
      let seen = this.seenPosts
      localStorage.setItem('seenposts', JSON.stringify(seen));
      } else if (tempHasSeen.includes(ID)) {
      console.log('is already has id')
      } else {
      this.seenPosts.push(ID);
      let seen = this.seenPosts
      localStorage.setItem('seenposts', JSON.stringify(seen));
      }
    },

   // checkPosts()









 /*      testfunction() {
      let div_list = document.querySelectorAll(".ifseen");
      let ifSeenList = [...div_list];
      //console.log(ifSeenList + ' if seen list values');

      for (let i = 0; i < ifSeenList.length; i++) {
        this.checker = localStorage.getItem("seenposts");
        let postArray = Array.from(this.checker);

        console.log(postArray + ' post Array values ');
        if (postArray.includes(ifSeenList[i].id)) {
          ifSeenList[i].classList.add("hasSeenPost");
        } else {
          console.log("could not find match");
        }
      }
    }   */




  },
 beforeMount() {
    this.seenPosts = JSON.parse(localStorage.getItem("seenposts") || "[]")

  },

  mounted: function () {
    this.getPosts();
/*     
    let localHasSeen = localStorage.getItem("seenposts");
    this.checker = localStorage.getItem("seenposts");
    //console.log(this.checker)
   // this.testfunction()
    if (!localHasSeen) {
      localStorage.setItem("seenposts", "0");
    } */







  },
};
</script>


//:class="{ 'hasSeenPost' : post.PostID == (vaildCheck.includes(post.PostID))}"


<style scoped>
/* new post css */
.post_body {
  max-width: 410px;
  margin: 20px auto;
  background: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 11px #ced8d8;
  text-align: left;
}

.hasNotSeenPost {
  height: 20px;
  width: 20px;
  margin: 0px;
  padding: 0px;
  background: rgb(57, 234, 148);
  border-radius: 20%;
  display: inline-block;
}

.hasSeenPost {
  height: 20px;
  width: 20px;
  margin: 0px;
  padding: 0px;
  background: rgb(187, 200, 202);
  border-radius: 20%;
  display: inline-block;
}

.post_userInfo {
  padding: 1px 0px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
}
.post_text{
  width: 100%;
  
}

.post_username {
  display: inline-block;
  margin: 0px 5px 5px 9px;
}

.post_text {
  margin: 10px 0px;
}

.post_image {
  width: 100%;
}

.post_text_box{
  width: 400px;
  white-space: wrap;
  overflow: hidden;
  

}

.backdrop {
  background: rgb(230, 241, 241);
  box-shadow: none;
  margin: 20px auto;
}

.createPost_button {
  display: block;
  margin: 20px auto 10px;
  text-align: center;
  transition: 500ms;
}

.createPost_button:hover {
  background: rgb(79, 197, 158);
}

.formBackDrop {
  max-width: 450px;
  margin: 0px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 11px #ced8d8;
  text-align: left;
}

.hasViewed {
  background: rgb(54, 245, 134);
  float: left;
  height: 70px;
  width: 15px;
  border-radius: 5px;
  margin: 0px 20px 0px 0px;
}

.hasNotViewed {
  background: rgb(165, 172, 168);
  float: left;
  height: 70px;
  width: 15px;
  border-radius: 5px;
  margin: 0px 20px 0px 0px;
}

textarea {
  resize: none;
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border: 1px solid #ddd;
  color: #555;
}

.form_post_content {
  color: #555;
}



@media only screen and (max-width: 380px) {
  .formBackDrop {
    margin-top: 20px;
  }
}

</style>