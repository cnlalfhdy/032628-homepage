// ----------------------------
// 기본 기능: 알림, 다크모드, 방문자 수
// ----------------------------
function sayHello() {
  alert("반가워요! 🎉");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// 방문자 카운트
let count = localStorage.getItem("visitCount") || 0;
count++;
localStorage.setItem("visitCount", count);

document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  if(counter) counter.innerText = "방문자 수: " + count;
});

// ----------------------------
// DOMContentLoaded 이후 댓글 및 fade-in 초기화
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("commentInput");
  const list = document.getElementById("commentList");
  const commentSection = document.getElementById("comments");

  // 로컬 저장 댓글 불러오기
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // ----------------------------
  // 댓글 화면 표시
  // ----------------------------
  function displayComments() {
    list.innerHTML = "";
    comments.forEach((comment, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${comment}</span>
        <button onclick="editComment(${index})">수정</button>
        <button onclick="deleteComment(${index})">삭제</button>
      `;
      list.appendChild(li);
    });
  }

  // ----------------------------
  // 댓글 추가
  // ----------------------------
  async function addComment() {
    const text = input.value.trim();
    if (!text) return;

    // 로컬에 저장
    comments.push(text);
    localStorage.setItem("comments", JSON.stringify(comments));

    displayComments();
    input.value = "";
  }

  // 버튼 클릭 이벤트
  document.querySelector("#comments button")?.addEventListener("click", addComment);

  // Enter 키 이벤트
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  });

  // ----------------------------
  // 댓글 수정/삭제
  // ----------------------------
  window.editComment = function(index) {
    const newComment = prompt("댓글을 수정하세요:", comments[index]);
    if (newComment && newComment.trim() !== "") {
      comments[index] = newComment.trim();
      localStorage.setItem("comments", JSON.stringify(comments));
      displayComments();
    }
  };

  window.deleteComment = function(index) {
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    displayComments();
  };

  // 초기 화면 표시
  displayComments();

  // ----------------------------
  // fade-in 스크롤 애니메이션
  // ----------------------------
  window.addEventListener("scroll", () => {
    if (commentSection) {
      const rect = commentSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        commentSection.classList.add("show");
      }
    }
  });

});