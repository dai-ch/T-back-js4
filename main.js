//操作するHTMLを取得
const titleLogo = document.getElementById('titleLogo');
const text = document.getElementById('text');
const btn = document.getElementById('btn');
const Api = 'https://opentdb.com/api.php?amount=10';

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
      const quizData = data.results;
      //APIを表示する関数
      ApiResults(quizData);
    })
    .catch(error => {
      console.log(error);
    });
}


//APIを表示する関数
const ApiResults = function (quizDatas) {

  const ul = document.createElement('ul');

  //取得したJSONデータを連想配列にて要素数分表示する
  quizDatas.forEach((quizData, index) => {
    //問題番号
    titleLogo.textContent = `問題${index + 1}`;

    //ジャンル
    let liCategory = document.createElement('li');
    liCategory.textContent = `[ジャンル]` + quizData.category;
    titleLogo.appendChild(liCategory);

    //難易度
    let liDifficulty = document.createElement('li');
    liDifficulty.textContent = `[難易度]` + quizData.difficulty;
    titleLogo.appendChild(liDifficulty);

    //問題文
    text.textContent = quizData.question;

    //回答欄の親要素を作成
    const ul = document.createElement('ul');

    //回答欄(正解)
    const correctAnswers = quizData.correct_answer;
    const correctAnswersBtn = document.createElement('button');
    correctAnswersBtn.textContent = correctAnswers;
    correctAnswersBtn.value = true;
    ul.appendChild(correctAnswersBtn);

    //回答欄（失敗）
    const incorrectAnswers = quizData.incorrect_answers;
    for (let i = 0; i < incorrectAnswers.length; i++) {
      const incorrectAnswersBtn = document.createElement('button');
      incorrectAnswersBtn.textContent = incorrectAnswers[i];
      incorrectAnswersBtn.value = false;
      ul.appendChild(incorrectAnswersBtn);
    }

    //問題文の下に選択肢を追加・表示
    text.after(ul);

    
  });

}


//問題(1~10を1つずつ表示する)

//回答ボタンを押したら処理が進む

//正解ならカウント

//10問題解いたら解答表示、正解のカウント数を出す、ボタンを押したら最初からやり直せる
