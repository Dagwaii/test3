let rotationAngle = 0;
let isDragging = false;
let dragStartAngle = 0;
let lpType = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  
  // 화살표 버튼 그리기
  drawArrows();
  
  translate(width / 2, height / 2);
  
  if (!isDragging) {
    rotationAngle += 1; // 자동 회전
  }
  
  rotate(rotationAngle);
  setLPStyle();
  drawLP();
}

// LP 스타일 설정
function setLPStyle() {
  if (lpType === 0) {
    fill('#FF5733');
    stroke('#C70039');
    strokeWeight(2);
  } else if (lpType === 1) {
    fill('#33FF57');
    stroke('#39C700');
    strokeWeight(4);
  } else if (lpType === 2) {
    fill('#3357FF');
    stroke('#0039C7');
    strokeWeight(6);
  } else if (lpType === 3) {
    fill('#F3FF33');
    stroke('#C7C700');
    strokeWeight(8);
  }
}

// LP 그리기
function drawLP() {
  ellipse(0, 0, 200, 180);
}

// 화살표 버튼 그리기
function drawArrows() {
  // 왼쪽 화살표
  fill('#999');
  noStroke();
  triangle(30, height / 2 - 20, 30, height / 2 + 20, 10, height / 2);
  
  // 오른쪽 화살표
  fill('#999');
  noStroke();
  triangle(width - 30, height / 2 - 20, width - 30, height / 2 + 20, width - 10, height / 2);
}

// 마우스 클릭 처리
function mousePressed() {
  // 왼쪽 화살표 클릭
  if (mouseX > 10 && mouseX < 30 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
    changeLPType(-1); // 스타일 이전으로 변경
  }
  
  // 오른쪽 화살표 클릭
  if (mouseX > width - 30 && mouseX < width - 10 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
    changeLPType(1); // 스타일 다음으로 변경
  }
  
  // LP 회전 영역 클릭 및 드래그 시작
  if (isInsideLP(mouseX, mouseY)) {
    startDragging(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (isDragging) {
    updateRotation(mouseX, mouseY);
  }
}

function mouseReleased() {
  stopDragging();
}

// 모바일 터치 이벤트
function touchStarted() {
  // 왼쪽 화살표 클릭
  if (touchX > 10 && touchX < 30 && touchY > height / 2 - 20 && touchY < height / 2 + 20) {
    changeLPType(-1); // 스타일 이전으로 변경
  }
  
  // 오른쪽 화살표 클릭
  if (touchX > width - 30 && touchX < width - 10 && touchY > height / 2 - 20 && touchY < height / 2 + 20) {
    changeLPType(1); // 스타일 다음으로 변경
  }
  
  // LP 회전 영역 클릭 및 드래그 시작
  if (isInsideLP(touchX, touchY)) {
    startDragging(touchX, touchY);
  }
  return false;
}

function touchMoved() {
  if (isDragging) {
    updateRotation(touchX, touchY);
  }
  return false;
}

function touchEnded() {
  stopDragging();
  return false;
}

// LP 영역 안에 있는지 확인
function isInsideLP(x, y) {
  let d = dist(x, y, width / 2, height / 2);
  return d < 100;
}

// 스타일 변경
function changeLPType(direction) {
  lpType = (lpType + direction + 4) % 4; // 4가지 스타일 순환
}

// 드래그 시작
function startDragging(x, y) {
  isDragging = true;
  dragStartAngle = atan2(y - height / 2, x - width / 2) - rotationAngle;
}

// 회전 업데이트
function updateRotation(x, y) {
  let currentAngle = atan2(y - height / 2, x - width / 2);
  rotationAngle = currentAngle - dragStartAngle;
}

// 드래그 종료
function stopDragging() {
  isDragging = false;
}
