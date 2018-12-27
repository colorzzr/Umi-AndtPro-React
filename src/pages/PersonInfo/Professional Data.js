import React from 'react';

const proData = [];

proData.push({
  title: 'My Web Server',
  description: 'personal interest in full-stack engineer (2018.8 – Now)',
  content: (
    <div>
      <p>
        When I was working in Tsinghua Energy Internet Research Institution, I found I was able to
        displaymy idea such apps or games throughout graphics instead of terminal. So far I used
        whar I learn in there to build up my server.
      </p>
      <p>
        Currently, the server is only for web. The web page includes game, calculator and other
        stuffs.Web is written by React with ant-design and dva as framworks. Backend for all
        application is using Go language.
      </p>
    </div>
  ),
});

proData.push({
  title: 'Internship in Tsinghua Energy Internet Research Institution',
  description: 'Building web management system for Xiamen Huatech (2018.5 – 2018.8)',
  content: (
    <div>
      <p>
        Huatech web management system is to help the company monitoring there switchs status. System
        is designed by {'front-back seperation'}. backend will analysis the data sent from switch
        and store into database. The web page shows the data from database, plot graph for voltages,
        current and so on, switch location and export detail data for the manager.(these are the
        features finished when I leave)
      </p>
      <p>
        I was in the team of two(later three). I used Go language to build up client application to
        collect data. My supervisor use beego to build the parse-API library for the golang. And I
        modify it in order to compact with application
      </p>
      <p>
        For web page, team decided to using ant-design pro and dva(umi) at start point because it is
        friendly to beginner. I wrote web page by React and Parse-API-Javascript was used to
        communicate between web and database
      </p>
    </div>
  ),
});

proData.push({
  title: 'Smart Guide Application',
  description: 'ECE297 Communication and Design -> Project “Smart Guide” (2018.1 – 2018.4)',
  content: (
    <div>
      <p>
        Smart Guide is a tourist guidance map constructed by C++. It can display the graphical map
        and basic UI. Throught the interface, users can highlight different type of buildings such
        as hospitals, restaurands and schools. Also when user click on the map, the map would show
        nearst intersection or point of interest. The most inportance is guiding feature. map can
        find the shortest path to the target intersection or point of interest.
      </p>
      <p>
        I was the team leader in group of three and mainly focus on building data structure and API
        for user interface. Better data structure can boost the program. Good API would help
        teammate to build UI.
      </p>
      <p>
        The last part of project was to solve the TSP(Traveller-Salesman Problem) which is exclusive
        from guiding feature. In this part, we had to find the shortest path between many diliver
        and pickup points.I designed the combined algorithms to tackle TSP. I combined 2-opt, greedy
        algorithm and simulated annealing as whole to find minimal path within certain a mount of
        time.
      </p>
    </div>
  ),
});

proData.push({
  title: 'Assembly Project “Robot Soccer',
  description: 'ECE243 Computer Organization -> Final Project “Robot Soccer” (2018.3 – 2018. 4)',
  content: (
    <div>
      <p>
        I had the leadership in the team of four. We decided to make the smart wheelchair by
        brainstorming. The aim for the smart wheelchair is to tackle the aging population in China.
      </p>
      <p>
        The Smart Wheel has two transform type. one is the normal wheelchair for siting and moving
        for who barely walk. another type is walk stick. this type can help elderly to walking
        around and do exercise
      </p>
      <p>
        I was the main structure design for wheelchair using Arduino. To make it transformable, I
        build lots of flexible unit. And also, I engaged in AI design team by using C and
        corrosponding Arduino libraries. For example, we come up the safety control. when the slope
        of ground is greater than 20 degrees, the maximum speed is reduce to 30km/h.
      </p>
    </div>
  ),
});

proData.push({
  title: 'Game Project “Zero Hero4”',
  description: 'ECE241 Digital System -> Final Project “Zero Hero4” (2017.11.8 – 11.29)',
  content: (
    <div>
      <p>
        There is nothing better than when other people is playing the game I made. So for the course
        project, I decided to using De1-Soc board with keyboard and VGA to make a game. I was
        response for designing hand-shake structure and random algorithm.
      </p>
      <p>
        ZeroHero 4 is the 4th version in ZeroHero Game. 1st and 2nd version was using C to pratice
        the stirng operation. 3rd version was in C++ to pratice the struct and class. Now 4th
        version was using Quartus application and hand-shake method to finish a lot of game
        operation
      </p>
      <p>
        ZeroHero is the game that player as a hero to defeat the boss and the game maker(me :) ).
        Player need to beat monster to gain experience for leveling up in order to take down the
        boss from 4 different difficluty. ZeroHero 4 has almost every basic RPG element include
        character attribute, items, money system. The best feature is random Algorithm for Rougue-
        like. I used the defect of clock in side De1-Soc board for every player. Each game would
        start with different birth location and initial character attribure.
      </p>
    </div>
  ),
});

proData.push({
  title: '2017 Hackathon in ShangHai',
  description: 'Optimizing the energy Allocation for given senario (2017.3.17)',
  content: (
    <div>
      <p>
        I had the leadership in the team of four. We decided to make the smart wheelchair by
        brainstorming. The aim for the smart wheelchair is to tackle the aging population in China.
      </p>
      <p>
        The Smart Wheel has two transform type. one is the normal wheelchair for siting and moving
        for who barely walk. another type is walk stick. this type can help elderly to walking
        around and do exercise
      </p>
      <p>
        I was the main structure design for wheelchair using Arduino. To make it transformable, I
        build lots of flexible unit. And also, I engaged in AI design team by using C and
        corrosponding Arduino libraries. For example, we come up the safety control. when the slope
        of ground is greater than 20 degrees, the maximum speed is reduce to 30km/h.
      </p>
    </div>
  ),
});

proData.push({
  title: 'Working in Engineer Strategy and Practice group',
  description: 'First year project (2017.1 – 2017.4)',
  content: (
    <div>
      <p>
        Engineer Strategy and Practice(ESP) is the first year course to give us a systematic way to
        design things. Our project was to help Horborr Village Association to tackle the bike
        thieves. for a semester, I worked with other 4 engineer student from different areas. For
        the design proposal, each of us generate a bike-rack design by self. And later on, we vote a
        best solution by functionality and survey for village resident.
      </p>
      <p>
        For Final Design Specification, we gave the detail dimension and cost of bike-rack. As well
        as the installation proccess and so on. I was response for the installation proccess, policy
        requirement and citen formate.
      </p>
    </div>
  ),
});

proData.push({
  title: 'Membership in UATA RoboSoccer Club in University of Toronto',
  description: 'Working with senior engineering (2016.9 – 2017.9)',
  content: (
    <p>
      The full name of UTRA is University of Toronto Robot Association. The association has three
      teams. Mech team build the physical robot. AI team develop the algorithm for robots, such as
      reponse for balls and communication between the agent. Control team uses simulation to test
      the algorithm and functionality of agent. I was working in control team and learning how to
      test a simple agent to walk or kick. Later on, I was helping team to design kick
      strategy.(Adding program Link)
    </p>
  ),
});

export default proData;
