

const chartsButton = document.querySelector('#chartsButton');
const chartDiv = document.querySelector('#chart');


chartsButton.addEventListener('click',()=>{
  fetch("chart.json").then((response)=>{
    if(response.status !== 200){
      console.log('err');
      return
    }
    response.json().then( (data)=>{
      console.log(data);
      let dataArray=[];
      for(let dat of data.chart1){
        dataArray.push(dat);
      }
      console.log(dataArray);
      d3.select("#chart").selectAll("div").data(dataArray).enter().append('div').style('width',(d)=>{return d+'px';}).text((d)=>{return d;});
    })
  });
});


