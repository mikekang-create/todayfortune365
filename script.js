// 화면에 날짜를 표시하고 입력한 정보로 오늘의 운세를 계산합니다.
const todayDate = document.querySelector("#today-date");
const fortuneForm = document.querySelector("#fortune-form");
const formMessage = document.querySelector("#form-message");
const resultSection = document.querySelector("#fortune-result");
const retryButton = document.querySelector("#retry-button");
const copyButton = document.querySelector("#copy-button");
const shareButton = document.querySelector("#share-button");
const actionMessage = document.querySelector("#action-message");
let currentFortune = null;
let currentName = "";

// 각 운세 세트는 서로 다른 생활 주제를 담고 있습니다.
const fortuneSets = [
  {
    overall: "할 일을 적어 우선순위를 정하면 마음이 한결 가벼워져요.",
    money: "정기 지출을 살펴보면 놓치고 있던 절약 방법을 찾을 수 있어요.",
    love: "약속한 시간을 지키는 작은 배려가 서로에게 믿음을 줘요.",
    work: "자료와 일정을 먼저 정리하면 중요한 일을 놓치지 않을 수 있어요.",
    health: "하루 중 잠깐이라도 몸을 풀며 긴장을 덜어 보세요.",
    relationship: "해야 할 말을 부드럽게 정리해 전하면 오해를 줄일 수 있어요.",
    overallScore: 4, moneyScore: 4, loveScore: 3, workScore: 5, healthScore: 3, relationshipScore: 4,
    luckyNumber: 7, luckyColor: "초록색", luckyDirection: "동쪽",
    message: "차분한 정리가 내일의 여유를 만들어 줍니다.",
  },
  {
    overall: "새로운 제안이나 생각을 열린 마음으로 살펴보기 좋은 날이에요.",
    money: "관심 있는 지출은 가격과 조건을 비교한 뒤 결정해 보세요.",
    love: "가벼운 안부를 먼저 건네면 대화의 시작이 자연스러워져요.",
    work: "작은 아이디어라도 메모해 두면 다음 기회에 도움이 돼요.",
    health: "익숙한 생활에 짧은 산책을 더해 기분을 환기해 보세요.",
    relationship: "새로운 사람의 이야기를 편견 없이 들어보면 배울 점이 있어요.",
    overallScore: 5, moneyScore: 3, loveScore: 4, workScore: 4, healthScore: 3, relationshipScore: 4,
    luckyNumber: 2, luckyColor: "하늘색", luckyDirection: "남쪽",
    message: "작은 호기심이 새로운 가능성을 보여줄 수 있어요.",
  },
  {
    overall: "주변과 보조를 맞추면 혼자 고민할 때보다 길이 잘 보여요.",
    money: "함께 쓰는 비용은 미리 기준을 정해두면 편안해요.",
    love: "상대의 말을 끝까지 듣고 나서 마음을 전해 보세요.",
    work: "동료와 진행 상황을 나누면 필요한 도움을 제때 찾을 수 있어요.",
    health: "가까운 사람과 가볍게 움직이면 꾸준히 실천하기 쉬워요.",
    relationship: "고마웠던 일을 구체적으로 표현하면 관계에 온기가 더해져요.",
    overallScore: 4, moneyScore: 3, loveScore: 5, workScore: 4, healthScore: 3, relationshipScore: 5,
    luckyNumber: 11, luckyColor: "살구색", luckyDirection: "서쪽",
    message: "마음을 나누는 대화가 오늘의 좋은 연결이 됩니다.",
  },
  {
    overall: "필요한 것과 원하는 것을 구분하면 선택이 또렷해지는 날이에요.",
    money: "결제 전 한 번 더 살펴보면 계획에 맞는 소비를 할 수 있어요.",
    love: "함께 정한 약속이나 목표를 이야기해 보면 즐거움이 커져요.",
    work: "예산과 자원을 확인한 뒤 움직이면 실행 계획이 현실적으로 잡혀요.",
    health: "식사 시간을 챙기고 무리한 일정은 조금 덜어 보세요.",
    relationship: "비용이 드는 모임은 서로 부담 없는 방법을 함께 정해 보세요.",
    overallScore: 4, moneyScore: 5, loveScore: 3, workScore: 4, healthScore: 3, relationshipScore: 3,
    luckyNumber: 8, luckyColor: "베이지색", luckyDirection: "북쪽",
    message: "현명한 선택은 작은 점검에서 시작됩니다.",
  },
  {
    overall: "속도를 조금 늦추고 자신에게 필요한 쉼을 살펴보세요.",
    money: "피곤할 때 하는 즉흥 구매보다 잠시 미뤄두는 편이 나아요.",
    love: "서로에게 혼자만의 시간이 필요할 수 있음을 존중해 주세요.",
    work: "중간에 짧은 휴식을 넣으면 집중력을 되찾는 데 도움이 돼요.",
    health: "잠드는 시간을 일정하게 맞추는 것부터 시작해 보세요.",
    relationship: "모든 요청에 바로 답하기보다 가능한 범위를 차분히 알려주세요.",
    overallScore: 3, moneyScore: 3, loveScore: 4, workScore: 3, healthScore: 5, relationshipScore: 3,
    luckyNumber: 4, luckyColor: "연보라색", luckyDirection: "동북쪽",
    message: "잠깐의 쉼도 하루를 잘 보내는 중요한 선택이에요.",
  },
  {
    overall: "준비해 온 일을 작게 시작하면 다음 단계가 조금 더 분명해져요.",
    money: "목표를 위한 저축이나 준비 계획을 한 가지 실천해 보세요.",
    love: "하고 싶었던 활동을 제안하면 함께할 새로운 즐거움이 생겨요.",
    work: "완벽한 순간을 기다리기보다 첫 작업을 시작해 보세요.",
    health: "평소 미뤄 둔 가벼운 운동을 짧게 시도해 볼 수 있어요.",
    relationship: "먼저 연락하기 어려웠던 사람에게 짧은 메시지를 보내보세요.",
    overallScore: 4, moneyScore: 4, loveScore: 4, workScore: 5, healthScore: 4, relationshipScore: 3,
    luckyNumber: 15, luckyColor: "주황색", luckyDirection: "남동쪽",
    message: "작게 시작한 행동이 다음 발걸음을 안내해 줍니다.",
  },
  {
    overall: "서로의 생각을 주고받으면 막혀 있던 일이 풀릴 실마리를 얻어요.",
    money: "공동으로 정한 지출은 내용을 서로 확인해 두는 게 좋아요.",
    love: "마음을 짐작하기보다 궁금한 점을 다정하게 물어보세요.",
    work: "회의에서는 핵심을 간단히 말하고 다른 의견도 메모해 보세요.",
    health: "화면을 오래 보았다면 눈과 어깨를 쉬게 해주세요.",
    relationship: "대화 중 바로 판단하지 않고 질문을 더하면 이해가 깊어져요.",
    overallScore: 4, moneyScore: 3, loveScore: 4, workScore: 4, healthScore: 3, relationshipScore: 5,
    luckyNumber: 9, luckyColor: "노란색", luckyDirection: "서남쪽",
    message: "잘 듣고 나눈 한마디가 좋은 변화를 시작해요.",
  },
  {
    overall: "한 가지 일에 시간을 정해 집중하면 만족스러운 진전을 만들 수 있어요.",
    money: "자주 쓰는 항목을 하나 골라 기록하면 소비 흐름이 보입니다.",
    love: "함께 있을 때 휴대전화를 내려두고 서로에게 집중해 보세요.",
    work: "알림을 잠시 줄이고 중요한 과제부터 마무리해 보세요.",
    health: "한 자세로 오래 있지 말고 틈틈이 일어나 움직여 주세요.",
    relationship: "대화 시간을 따로 정하면 서로의 이야기에 더 집중할 수 있어요.",
    overallScore: 4, moneyScore: 4, loveScore: 4, workScore: 5, healthScore: 3, relationshipScore: 4,
    luckyNumber: 6, luckyColor: "남색", luckyDirection: "북동쪽",
    message: "오늘의 집중이 의미 있는 한 걸음을 만듭니다.",
  },
  {
    overall: "계획에 작은 변화가 생겨도 유연하게 순서를 조정해 보세요.",
    money: "예상 밖의 지출을 대비해 여유 금액을 남겨두면 든든해요.",
    love: "늘 하던 방식에 작은 변화를 더하면 새로운 대화가 열려요.",
    work: "상황이 달라지면 우선순위를 다시 정하는 것도 좋은 대응이에요.",
    health: "날씨와 컨디션에 맞춰 활동량을 조절해 보세요.",
    relationship: "상대의 입장이 달라졌을 수 있으니 먼저 확인해 보는 게 좋아요.",
    overallScore: 3, moneyScore: 3, loveScore: 4, workScore: 4, healthScore: 3, relationshipScore: 4,
    luckyNumber: 18, luckyColor: "민트색", luckyDirection: "남서쪽",
    message: "유연한 마음이 예상 밖의 하루를 편안하게 합니다.",
  },
  {
    overall: "중요한 선택은 조건을 살펴보고 여유를 두어 결정해 보세요.",
    money: "큰 지출이나 계약은 세부 내용을 읽어본 뒤 판단하는 편이 좋아요.",
    love: "감정이 앞설 때는 잠시 생각을 정리하고 차분히 이야기해 보세요.",
    work: "보내기 전 자료와 일정의 숫자를 다시 확인하면 실수를 줄일 수 있어요.",
    health: "새로운 방식보다 내게 익숙하고 편안한 생활 습관을 챙겨 보세요.",
    relationship: "전해 들은 이야기만으로 결론 내리지 말고 당사자에게 확인하세요.",
    overallScore: 3, moneyScore: 4, loveScore: 3, workScore: 5, healthScore: 4, relationshipScore: 3,
    luckyNumber: 5, luckyColor: "회색", luckyDirection: "북서쪽",
    message: "한 번 더 확인하는 여유가 마음을 든든하게 해요.",
  },
  {
    overall: "평소 곁에 있는 것들의 고마움을 돌아보기 좋은 날이에요.",
    money: "이미 가진 물건을 잘 활용하면 새로 사지 않아도 충분할 수 있어요.",
    love: "함께한 시간 중 좋았던 순간을 나누면 서로 웃을 일이 생겨요.",
    work: "도움을 준 동료에게 감사 인사를 전하면 협업 분위기가 좋아져요.",
    health: "편안하게 느끼는 활동을 골라 꾸준히 이어가 보세요.",
    relationship: "먼저 고마움을 표현하면 평범한 관계도 더 따뜻해질 수 있어요.",
    overallScore: 4, moneyScore: 4, loveScore: 5, workScore: 4, healthScore: 4, relationshipScore: 5,
    luckyNumber: 10, luckyColor: "분홍색", luckyDirection: "동남쪽",
    message: "고마움을 알아보는 마음이 오늘을 풍성하게 합니다.",
  },
  {
    overall: "새로운 계획을 세우되 오늘 할 수 있는 한 가지부터 정해 보세요.",
    money: "앞으로의 목표에 맞춰 작은 저축 계획을 시작해 볼 수 있어요.",
    love: "앞으로 함께 해보고 싶은 일을 편안하게 이야기해 보세요.",
    work: "새 업무를 시작한다면 필요한 정보와 도움을 먼저 확인해 보세요.",
    health: "지킬 수 있는 작은 생활 목표를 하나 정해 실천해 보세요.",
    relationship: "새로운 모임에서는 먼저 미소와 인사로 대화를 열어 보세요.",
    overallScore: 5, moneyScore: 4, loveScore: 4, workScore: 4, healthScore: 3, relationshipScore: 4,
    luckyNumber: 1, luckyColor: "아이보리색", luckyDirection: "동쪽",
    message: "새로운 시작은 오늘의 작은 실천에서 비롯됩니다.",
  },
];

todayDate.textContent = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(new Date());

// 날짜별 숫자는 매일 1씩 바뀌므로 같은 생년월일도 날짜마다 다른 세트가 선택됩니다.
function getFortuneIndex(birthdate, date = new Date()) {
  const birthdateSum = birthdate
    .replaceAll("-", "")
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  // 시간대와 관계없이 달력 날짜를 하루 단위 숫자로 바꿉니다.
  const dateNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000,
  );

  return (birthdateSum + dateNumber) % fortuneSets.length;
}

function showFortune(name, birthdate) {
  const fortune = fortuneSets[getFortuneIndex(birthdate)];
  currentFortune = fortune;
  currentName = name;
  actionMessage.textContent = "";

  document.querySelector("#result-heading").textContent = `${name}님의 오늘의 운세`;
  document.querySelector("#overall-text").textContent = fortune.overall;
  document.querySelector("#money-text").textContent = fortune.money;
  document.querySelector("#love-text").textContent = fortune.love;
  document.querySelector("#work-text").textContent = fortune.work;
  document.querySelector("#health-text").textContent = fortune.health;
  document.querySelector("#people-text").textContent = fortune.relationship;
  document.querySelector("#lucky-number").textContent = fortune.luckyNumber;
  document.querySelector("#lucky-color").textContent = fortune.luckyColor;
  document.querySelector("#lucky-direction").textContent = fortune.luckyDirection;
  document.querySelector("#daily-message").textContent = fortune.message;

  // HTML의 별점 순서는 종합운, 재물운, 애정운, 직장·사업운, 건강운, 대인관계운입니다.
  const scores = [
    fortune.overallScore,
    fortune.moneyScore,
    fortune.loveScore,
    fortune.workScore,
    fortune.healthScore,
    fortune.relationshipScore,
  ];
  document.querySelectorAll(".fortune-stars").forEach((starElement, index) => {
    const score = scores[index];
    starElement.textContent = "★".repeat(score) + "☆".repeat(5 - score);
    starElement.setAttribute("aria-label", `참고용 별점 ${score}점`);
    starElement.removeAttribute("aria-hidden");
  });

  // 다음 화면 그리기 단계에서 표시 클래스를 추가해 자연스럽게 나타나게 합니다.
  resultSection.hidden = false;
  requestAnimationFrame(() => resultSection.classList.add("is-visible"));
}

// 별점 숫자를 복사할 때 읽을 수 있는 별 문자로 바꿉니다.
function makeStarText(score) {
  return "★".repeat(score) + "☆".repeat(5 - score);
}

// 화면에 표시 중인 운세를 텍스트로 정리합니다.
function buildFortuneText(includeName) {
  if (!currentFortune) return "";

  const fortune = currentFortune;
  const heading = includeName ? `${currentName}님의 오늘의 운세` : "오늘의 운세";

  return [
    "오늘운세365",
    heading,
    "",
    `종합운 ${makeStarText(fortune.overallScore)}`,
    fortune.overall,
    "",
    `재물운 ${makeStarText(fortune.moneyScore)}`,
    fortune.money,
    "",
    `애정운 ${makeStarText(fortune.loveScore)}`,
    fortune.love,
    "",
    `직장·사업운 ${makeStarText(fortune.workScore)}`,
    fortune.work,
    "",
    `건강운 ${makeStarText(fortune.healthScore)}`,
    fortune.health,
    "",
    `대인관계운 ${makeStarText(fortune.relationshipScore)}`,
    fortune.relationship,
    "",
    "오늘의 행운",
    `행운 숫자: ${fortune.luckyNumber}`,
    `행운 색상: ${fortune.luckyColor}`,
    `행운 방향: ${fortune.luckyDirection}`,
    "",
    "오늘의 한마디",
    `“${fortune.message}”`,
  ].join("\n");
}

// 최신 클립보드 API를 먼저 쓰고, 안 되면 구형 브라우저용 방법을 시도합니다.
async function copyTextToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // 권한이나 보안 컨텍스트 문제일 수 있어 아래 대체 방법을 시도합니다.
    }
  }

  let temporaryInput;
  try {
    temporaryInput = document.createElement("textarea");
    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    return copied;
  } catch (error) {
    if (temporaryInput) temporaryInput.remove();
    return false;
  }
}

fortuneForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const name = document.querySelector("#name").value.trim();
  const birthdate = document.querySelector("#birthdate").value;
  const gender = document.querySelector('input[name="gender"]:checked');

  // 필수 항목이 빠졌으면 결과를 보여주지 않고 안내합니다.
  if (!name || !birthdate || !gender) {
    formMessage.textContent = "이름, 생년월일, 성별을 모두 입력해 주세요.";
    resultSection.classList.remove("is-visible");
    resultSection.hidden = true;
    return;
  }

  showFortune(name, birthdate);
  formMessage.textContent = "";
});

copyButton.addEventListener("click", async () => {
  const copied = await copyTextToClipboard(buildFortuneText(true));
  actionMessage.textContent = copied
    ? "운세 결과가 복사되었습니다."
    : "복사하지 못했습니다. 브라우저의 클립보드 권한을 확인해 주세요.";
});

shareButton.addEventListener("click", async () => {
  // 공유 텍스트에는 이름, 생년월일, 성별을 넣지 않습니다.
  const shareText = buildFortuneText(false);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title: "오늘운세365 운세 결과", text: shareText });
      actionMessage.textContent = "운세 결과를 공유했습니다.";
      return;
    } catch (error) {
      // 사용자가 공유 창을 닫은 경우에는 원치 않는 복사를 하지 않습니다.
      if (error.name === "AbortError") return;

      const copied = await copyTextToClipboard(shareText);
      actionMessage.textContent = copied
        ? "공유를 완료하지 못해 운세 결과를 복사했습니다."
        : "공유와 복사에 실패했습니다. 브라우저 권한을 확인해 주세요.";
      return;
    }
  }

  const copied = await copyTextToClipboard(shareText);
  actionMessage.textContent = copied
    ? "이 브라우저에서는 공유 기능을 지원하지 않아 운세 결과를 복사했습니다."
    : "공유 기능을 사용할 수 없고 복사에도 실패했습니다. 브라우저 권한을 확인해 주세요.";
});

// 결과를 닫고 입력 영역으로 돌아가 이름을 다시 입력할 수 있게 합니다.
retryButton.addEventListener("click", () => {
  resultSection.classList.remove("is-visible");
  resultSection.hidden = true;
  document.querySelector("#name").focus();
  fortuneForm.scrollIntoView({ behavior: "smooth", block: "start" });
});
