var state = {
    balance: 1000,
    plannedHours: 400,
    hoursRemaining: 100,
    scheduledTasks: [
        
    ]
}

var balanceEl = document.querySelector('#balance');
var plannedHoursEl = document.querySelector('#plannedHours');
var hoursRemainingEl = document.querySelector('#hoursRemaining');
var scheduledTasksEl = document.querySelector('#task');
var plannedHoursBtnEl = document.querySelector('#plannedHoursBtn');
var hoursRemainingBtnEl = document.querySelector('#hoursRemainingBtn');
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');

function init() {
    var localState = JSON.parse(localStorage.getItem('hoursRemainingTrackerState'));

    if (localState !== null) {
        state = localState;
    }
    
    updateState();
    initListeners();
}

function uniqueId() {
    return Math.round(Math.random() * 1000000);
}

function initListeners() {
    plannedHoursBtnEl.addEventListener('click', onAddPlannedHoursClick);
    hoursRemainingBtnEl.addEventListener('click', onAddHoursRemainingClick);
}



function onAddPlannedHoursClick() {
    
    addScheduledTask(nameInputEl.value, amountInputEl.value, 'plannedHours');
    
}

function addScheduledTask(name, amount, type) {
    if (name !== '' && amount !== '') {
        var task = { 
            id: uniqueId(),
            name: name, 
            amount: parseInt(amount), 
            type: type
        };

        state.scheduledTasks.push(task);


//Pie Chart
var xValues = [];
var yValues = [];
var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];









        xValues.push(nameInputEl.value);
        yValues.push(amountInputEl.value);
        
        new Chart("myChart", {
            type: "pie",
            data: {
              labels: xValues,
              datasets: [{
                backgroundColor: barColors,
                data: yValues
              }]
            },
            options: {
              title: {
                display: true,
                text: "Pie Chart"
              }
            }
          });
           
           




        updateState();
    } else {
        alert('Please enter valid data');
    }

    nameInputEl.value = '';
    amountInputEl.value = '';
}

function onAddHoursRemainingClick() {
    addScheduledTask(nameInputEl.value, amountInputEl.value, 'hoursRemaining');
}

function onDeleteClick(event) {
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for (var i = 0; i < state.scheduledTasks.length; i++) {
        if (state.scheduledTasks[i].id === id) {
            deleteIndex = i;
            break;
        }
    }

    state.scheduledTasks.splice(deleteIndex, 1);

    updateState();
}

function updateState() {
    var balance = 0,
    plannedHours = 0,
    hoursRemaining = 0,
        item;
  

    for (var i = 0; i < state.scheduledTasks.length; i++) {
        item = state.scheduledTasks[i];

        if (item.type === 'plannedHours') {
            plannedHours += item.amount;
        } else if (item.type === 'hoursRemaining') {
            hoursRemaining += item.amount;
        }
        
        
    }

    

    balance = plannedHours - hoursRemaining;

    state.balance = balance;
    state.plannedHours = plannedHours;
    state.hoursRemaining = 24 - plannedHours;

    localStorage.setItem('hoursRemainingTrackerState', JSON.stringify(state))

    render();
}

function render() {
    
  //  balanceEl.innerHTML = `${state.balance}`;
    
  plannedHoursEl.innerHTML = `${state.plannedHours} `;
  hoursRemainingEl.innerHTML = `${state.hoursRemaining}`;

    var taskEl, containerEl, amountEl, item, btnEl;

    scheduledTasksEl.innerHTML = '';

    for (var i = 0; i < state.scheduledTasks.length; i++) {
        item = state.scheduledTasks[i];
        taskEl = document.createElement('li');
        taskEl.append(item.name);

        scheduledTasksEl.appendChild(taskEl);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');



        if (item.type === 'plannedHours') {
            amountEl.classList.add('plannedHours-amt');
        } else if (item.type === 'hoursRemaining') {
            amountEl.classList.add('hoursRemaining-amt');
        }

        

        amountEl.innerHTML = `${item.amount} hours`;

        containerEl.appendChild(amountEl);

        btnEl = document.createElement('button');
        btnEl.setAttribute('data-id', item.id);
        btnEl.innerHTML = 'X';

        btnEl.addEventListener('click', onDeleteClick);

        containerEl.appendChild(btnEl);

        taskEl.appendChild(containerEl);
    }
}

init();




