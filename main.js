//操作するHTMLを取得
const titleLogo = document.getElementById('titleLogo');
const text = document.getElementById('text');
const btn = document.getElementById('btn');
const Api = 'https://opentdb.com/api.php?amount=10';
//問題番号を管理する変数
let quizNumber = 0;
//正解数をカウントする変数
let count = 0;
//回答欄の親要素を作成
const container = document.createElement('div');

//ボタンを押したときにAPIを取得する
btn.addEventListener('click', function () {
  //API取得中に表示するテキスト
  titleLogo.textContent = '取得中';
  text.textContent = '少々お待ちください';
  btn.style.display = 'none';
  chachApi(text)
});

//JSONデータを取得するAPI
const chachApi = function (text) {
  fetch(Api)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then(data => {
      //問題の順番を管理・表示する変数
      Quiz(data);
    })
    .catch(error => {
      console.log(error);
    });
}

//問題の順番を管理・表示する変数
const Quiz = function (data) {

  //dataの中のHTML要素を取得
  const quizDatas = data.results;

  //２問目以降のクイズを出すときに答えたクイズのHTMLを消去
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  //quizDatasの中からクイズを1つ取得
  const quiz = quizDatas[quizNumber];

  //問題番号
  titleLogo.textContent = `問題${quizNumber + 1}`;
  //ジャンル
  let liCategory = document.createElement('li');
  liCategory.textContent = `[ジャンル]` + quiz.category;
  titleLogo.appendChild(liCategory);
  //難易度
  let liDifficulty = document.createElement('li');
  liDifficulty.textContent = `[難易度]` + quiz.difficulty;
  titleLogo.appendChild(liDifficulty);
  //問題文
  text.textContent = quiz.question;
  //問題文の下に選択肢を追加・表示
  text.after(container);

  //回答欄を格納する配列
  let arrayAnswer = [];

  //回答欄(正解)
  const correctAnswers = quiz.correct_answer;
  let answerBtn = document.createElement('button');
  answerBtn.classList.add('answerBtn');
  answerBtn.textContent = correctAnswers;
  answerBtn.value = true;
  arrayAnswer.push(answerBtn);

  //正解のボタンを押した時の処理
  answerBtn.addEventListener('click', () => {
    //問題が正解していたらカウントする
    if (answerBtn.value === 'true') {
      count++;
    }
    nextQuiz(data, quizDatas);
  })

  //回答欄（失敗）
  const incorrectAnswers = quiz.incorrect_answers;
  for (let i = 0; i < incorrectAnswers.length; i++) {
    let answerBtn = document.createElement('button');
    answerBtn.classList.add('answerBtn');
    answerBtn.textContent = incorrectAnswers[i];
    answerBtn.value = false;
    arrayAnswer.push(answerBtn);
    //不正解ボタンを押した時の処理
    answerBtn.addEventListener('click', () => {
      //問題が正解していたらカウントする
      if (answerBtn.value === 'true') {
        count++;
      }
      nextQuiz(data, quizDatas);
    })
  }

  shuffle(arrayAnswer);
}

//問題の表示順をシャッフルする関数
function shuffle(arrayAnswer) {
  //乱数を出す
  for (let i = arrayAnswer.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let num = arrayAnswer[i];
    arrayAnswer[i] = arrayAnswer[j];
    arrayAnswer[j] = num;
  }
  //問題数の数だけulの子要素に追加
  for (let p = 0; p < arrayAnswer.length; p++) {
    container.appendChild(arrayAnswer[p]);
  }
}

//次の問題を表示する関数、正解を押していたらカウントする
const nextQuiz = (data, quizDatas) => {
  //クイズ番号を1つ更新
  quizNumber++;
  //クイズを全てといたら処理を実行
  if (quizNumber === quizDatas.length) {
    funish();
  } else {
    Quiz(data);
  }
};

//10問題解いたら解答表示、正解のカウント数を出す
const funish = function () {
  titleLogo.textContent = `あなたの正解数は${count}です！！`;
  text.textContent = '再度チャレンジしたい方は以下のボタンをクリック！！';
  const homeBtn = document.createElement('button');
  homeBtn.textContent = 'ホームに戻る';
  text.after(homeBtn);
  container.style.display = 'none';

  //最初から読み直し
  homeBtn.addEventListener('click', () => {
    document.location.reload();
  })
}
