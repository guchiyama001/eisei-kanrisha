// ===== Quiz Engine =====
let currentQuestions=[],currentIndex=0,score=0,answered=false;

function startQuiz(questions,colorCls){
  currentQuestions=[...questions];currentIndex=0;score=0;answered=false;
  document.getElementById('quizArea').style.display='block';
  document.getElementById('resultArea').style.display='none';
  document.getElementById('scoreText').className='quiz-score '+colorCls;
  document.getElementById('progressFill').className='quiz-progress-fill '+colorCls;
  renderQuestion(colorCls);
}

function renderQuestion(colorCls){
  answered=false;
  const q=currentQuestions[currentIndex],total=currentQuestions.length;
  document.getElementById('progressText').textContent=`${currentIndex+1} / ${total}`;
  document.getElementById('scoreText').textContent=`正解 ${score}`;
  document.getElementById('progressFill').style.width=`${(currentIndex/total)*100}%`;
  document.getElementById('questionNumber').className='question-number '+colorCls;
  document.getElementById('questionNumber').textContent=`第${currentIndex+1}問`;
  document.getElementById('questionText').textContent=q.q;
  const el=document.getElementById('choices');el.innerHTML='';
  ['A','B','C','D'].forEach((l,i)=>{
    if(!q.c[i])return;
    const btn=document.createElement('button');
    btn.className='choice-btn';
    btn.innerHTML=`<span class="choice-label">${l}</span><span>${q.c[i]}</span>`;
    btn.onclick=()=>selectAnswer(i,colorCls);
    el.appendChild(btn);
  });
  document.getElementById('explanationBox').classList.remove('visible');
  document.getElementById('nextBtn').classList.remove('visible');
}

function selectAnswer(i,colorCls){
  if(answered)return;answered=true;
  const q=currentQuestions[currentIndex];
  document.querySelectorAll('.choice-btn').forEach((b,j)=>{
    b.classList.add('disabled');
    if(j===q.a)b.classList.add('correct');
    if(j===i&&j!==q.a)b.classList.add('incorrect');
  });
  if(i===q.a)score++;
  document.getElementById('scoreText').textContent=`正解 ${score}`;
  document.getElementById('explanationText').textContent=q.e;
  document.getElementById('explanationBox').classList.add('visible');
  const nb=document.getElementById('nextBtn');
  nb.textContent=currentIndex<currentQuestions.length-1?'次の問題へ':'結果を見る';
  nb.className='next-btn visible '+colorCls;
  nb.onclick=()=>nextQuestion(colorCls);
}

function nextQuestion(colorCls){
  currentIndex++;
  if(currentIndex<currentQuestions.length){renderQuestion(colorCls);window.scrollTo({top:0,behavior:'smooth'});}
  else showResult(colorCls);
}

function showResult(colorCls){
  document.getElementById('quizArea').style.display='none';
  document.getElementById('resultArea').style.display='block';
  const total=currentQuestions.length,pct=Math.round((score/total)*100);
  document.getElementById('resultCircle').className='result-circle '+colorCls;
  document.getElementById('resultScore').className='result-score '+colorCls;
  document.getElementById('resultScore').textContent=score;
  document.getElementById('resultTotal').textContent=`/ ${total} 問`;
  document.getElementById('retryBtn').className='btn-primary '+colorCls;
  let msg,sub;
  if(pct>=80){msg='素晴らしい！🎉';sub='合格ラインに達しています。この調子で頑張りましょう。';}
  else if(pct>=60){msg='もう少し！💪';sub='合格ラインまであと少しです。復習しましょう。';}
  else{msg='復習しよう 📖';sub='解説をよく読んで理解を深めていきましょう。';}
  document.getElementById('resultMessage').textContent=msg;
  document.getElementById('resultSub').textContent=sub;
  // Save progress
  if(window.quizKey){
    try{const p=JSON.parse(localStorage.getItem('eisei_v4')||'{}');p[window.quizKey]={correct:score,total:total,date:Date.now()};localStorage.setItem('eisei_v4',JSON.stringify(p));}catch(e){}
  }
  window.scrollTo({top:0,behavior:'smooth'});
}

function getProgress(key){
  try{const p=JSON.parse(localStorage.getItem('eisei_v4')||'{}');return p[key]||null;}catch{return null;}
}

// Header scroll
window.addEventListener('scroll',()=>{
  const h=document.querySelector('.header');
  if(h)h.classList.toggle('scrolled',window.scrollY>4);
});
