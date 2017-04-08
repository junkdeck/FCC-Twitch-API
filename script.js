function error(err){
    if(err){
        $('.header').append("Something went wrong. Please try again later.");
    }
}

function appendUser(dest, name, logo, url, id){
    $(dest).append("<a href='"+url+"' target='_blank'>"+
    "<div class='card' id='"+id+"'>"+
    "<img class='channel-logo' src='"+logo+"'/>"+
    "<h3>"+name+"</h3>"+
    "</div>"+
    "</a>");
}

function userNotExist(dest, message){
    $(dest).append("<div class='card deleted'>"+
    "<h3>"+
    message+
    "</h3>"+
    "</div>");
}

function channelCb(data){
    if(data.display_name){
        console.log(data.display_name);
    }
    if(!data.error){
        appendUser('.wrapper', data.name, data.logo, data.url, data._id);
        //CHECK STREAM AFTER CHANNEL RESPONSE IS COMPLETED
        $.getJSON(twitchURL+'streams/'+data.display_name+"?callback=?").done(streamCb).fail(error);
    }else if(data.error){
        userNotExist('.header',data.message)
    }
}

function streamCb(data){
    if(data.stream !== null){
        let chanID = data.stream.channel._id;
        $("#"+chanID).addClass('online');
        $("#"+chanID).append("<h4>"+
        data.stream.channel.status+
        "</h4>");
    }
}

let twitchURL = "https://wind-bow.gomix.me/twitch-api/";
let users = ['freecodecamp','ESL_SC2','sips_','comster404'];

users.forEach(function(key,index){
    $.getJSON(twitchURL+'channels/'+key+"?callback=?").done(channelCb).fail(error);
});
