function appStart() {
  //로직들

  const handlekeydown = () => {
    //함수 선언
    console.log("키가 눌렸습니다!!");
  };
  window.addEventListener("keydown", handlekeydown);
}

appStart();
