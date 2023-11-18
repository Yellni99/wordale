const 정답 = "APPLE";

let attempts = 0; //6번의 시도 (한줄을 나타나는 단위)
let index = 0; //0부터 시작 let은 수정할 수 있는 함수
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:30.7vw; border: 1px solid #111146; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div); //자식을 추가한다.
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); //이벤트 리스너가 지워지면서 키입력 안됨
    displayGameover();
    clearInterval(timer); //어떤 인터벌을 클리어
  };

  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번시도가 끝나면 리턴됨 게임오버시키고!!
    attempts += 1; //다음줄로 넘어가면서
    index = 0; //인덱스 초기화
  };

  const handleEnterKey = () => {
    //엔터키가 입력이 되면
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1; //입력한 글자와 정답글자가 같으면 맞은 갯수를 하나 늘려줌
        block.style.background = "#6AAA64"; //같으면 초록색으로 표시
      } else if (정답.includes(입력한_글자)) block.style.background = "#c9b458";
      //같지는 않지만 만약 입력한 글자가 정답 글자 안에 있는지 파악 노란색으로 표시
      else block.style.background = "#787c7e"; //아무것도 아니라면 회색으로 표시
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover(); //5개 다 맞추면 게임 끝
    else nextLine();
    //다음줄로 넘기기
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    //함수 선언
    const key = event.key.toUpperCase(); // toUpperCase ==> 대문자로 변경해주는 함수
    const keyCode = event.keyCode; //알파벳의 숫자 a 65, b 66이런거
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    //어떤 값을 뽑을 때, [] => 속성값을 뽑을 수 있음
    // ${attempts}${index} ==> 0번째 시도에 0번째 인덱스인 블럭을 가져와서 텍스트를 업데이트 하는 것
    else if (index === 5) {
      //index가 5이면 return
      if (event.key === "Enter")
        handleEnterKey(); //엔터키를 누르면 위에 handleEnterKey 호출
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index = index + 1; // [intex += 1] or [index++] 도 같은 뜻
    }
  };

  const startTime = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTime();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
