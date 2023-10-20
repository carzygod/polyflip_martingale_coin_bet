const rate = 1.94;

var wallet = [0];

var maxBal = 0;

var totalBet = 0;

const originBal = 4096;

const walletRate = 2 ;

var bal = originBal

var myBalance = 0;

var index = 0 ; 

function random()
{
    var a = Math.random();
    if(a > 0.5)
    {
        return true;
    }else if(a < 0.5)
    {
        return false;
    }else{
        return random()
    }
}

function getBalance()
{
    if((bal+wallet[0])>maxBal)
    {
        maxBal = bal+wallet[0];
    }
    return bal
}

function storageBal(amount)
{
    wallet[0]+=amount;
    bal-=amount;
}

function withdrasBal(amount)
{
    wallet[0]-=amount;
    bal+=amount;
}

function newBet(amount)
{
    totalBet++;
    console.log("💰 Bet :: ",totalBet," 👛 Max win :: ",maxBal)
    bal -= amount
    var a = random();
    if(a)
    {
        bal+=rate*amount;
    }
    return true;
}
async function signLoop(){

    var nowBalance = getBalance();
    if(nowBalance < 1)
    {
        if(wallet[0] < originBal)
        {
            console.log("❎ you loss all your money :: ",bal,wallet);
            process.exit();
        }else{
            //transfer money back
            withdrasBal(originBal)
        }
    }

    console.log(Number(nowBalance)<=Number(myBalance))
    if(Number(nowBalance)<=Number(myBalance))
    {
        var amount = Math.pow(2, index);
        if(amount<(nowBalance))
        {
            var tx = newBet(
                amount
                    );

            if(tx)
            {
                console.log(
                    index.toString()+"🔥You have place new bet for : ",amount,""
                    )
            }else{
                throw("err");
            }
        }else{
            var tx = newBet(
                (nowBalance)
                    );
            if(tx)
            {
                console.log(
                    index.toString()+"⚠️ This is a warning for new bet : ",(nowBalance),""
                )
            }else{
                throw("err");
            }
        }
        myBalance=nowBalance;
        index++;
    }else{
        console.log("🍺You have win the bet , Now your balance : ",nowBalance);

        if(nowBalance>originBal*walletRate)
        {
            var storage = nowBalance - originBal;
            storageBal(storage);
        }
        myBalance=nowBalance;
        index=0;
    }

    return true;
}


async function init(){
    myBalance = getBalance();
    var i = 1 ;
    while(true){
        try{
            await signLoop();
            
        }
        catch(e){
            console.log(e)
            
        }
        if(totalBet > originBal)
        {
            break;
        }
        i++;
    }

}

async function debug()
{
    for(var i = 0 ; i < 10 ; i++)
    {
        console.log(random())
    }
    var before = getBalance()
    console.log(
        "🔥Currently Balance"
        ,
        before
        )
    var hash = newBet(1)
    console.log()
    var after = getBalance();
    console.log(
        "🍺Now Balance"
        ,
        after
        )
    console.log(Number(after)<=Number(before))
}
// signLoop()

// debug()

init()