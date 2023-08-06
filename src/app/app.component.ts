import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';
import SUCC from '../assets/succes.json';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rotate', [
      state('0', style({ width : "0px", left: "740px" })),
      state('1', style({ width : "372px", left: "680px" })),
      transition('0 => 1', animate('2000ms ease-out')),
      transition('1 => 0', animate('2000ms ease-out'))
    ]),

    trigger('rotate2', [
      state('0', style({ width : "0px", left: "740px" })),
      state('1', style({ width : "378px", left: "680px" })),
      transition('0 => 1', animate('1950ms ease-out')),
      transition('1 => 0', animate('1950ms ease-out'))
    ]),
    
    trigger('crop', [
      state('0', style({ height : "575px" })),
      state('1', style({ height : "0px" })),
      transition('0 => 1', animate('2000ms ease-out')),
      transition('1 => 0', animate('2000ms ease-out'))
    ]),

    trigger('grow', [
      state('0', style({ transform: "scale(1)" })),
      state('1', style({ transform: "scale(1.2)" })),
      transition('0 => 1', animate('500ms ease-out')),
      transition('1 => 0', animate('500ms ease-out'))
    ]),

    trigger('arriveleft', [
      state('0', style({ transform: "translate(-1000px,-50px)"})),
      state('1', style({ transform: "translate(0px,0px)"})),
      transition('0 => 1', animate('600ms ease-out'))
    ]),

    trigger('arriveright', [
      state('0', style({ transform: "translate(1000px,-50px)"})),
      state('1', style({ transform: "translate(0px,0px)"})),
      transition('0 => 1', animate('600ms ease-out'))
    ]),

    trigger('idle', [
      state('0', style({ transform: "translate(0px,0px)"})),
      state('1', style({ transform: "translate(-3px,1px)"})),
      state('2', style({ transform: "translate(3px,1px)"})),
      transition('0 => 1', animate('400ms')),
      transition('0 => 2', animate('400ms')),
      transition('1 => 0', animate('400ms')),
      transition('2 => 0', animate('400ms'))
    ]),

    trigger('animationcombat', [
      state('idle', style({ left: "0px" })),
      state('dashavant', style({ left: "{{arrivex}}px" }), {params: {arrivex: '0'}}),
      state('coup', style({ left: "{{arrivex}}px" }), {params: {arrivex: '0'}}),
      state('takedamage', style({ left: "{{arrivex}}px" }), {params: {arrivex: '0'}}),
      state('death', style({ left: "{{arrivex}}px", opacity:0 }), {params: {arrivex: '0'}}),
      transition('idle => dashavant', animate('400ms ease-in')),
      transition('dashavant => idle', animate('400ms ease-out')),
      transition('dashavant => coup', animate('400ms ease-in')),
      transition('coup => dashavant', animate('400ms ease-out')),
      transition('idle => takedamage', animate('400ms ease-out')),
      transition('takedamage => idle', animate('400ms ease-in')),
      transition('dashavant => takedamage', animate('400ms ease-out')),
      transition('takedamage => death', animate('1000ms'))
    ]),

    trigger('dmgAnimation', [
      state('0', style({ top: "{{pos}}px", opacity: 1 }), {params: {pos: '0'}}),
      state('1', style({ top: "{{pos}}px", opacity: 0 }), {params: {pos: '0'}}),
      transition('0 => 1', animate('4000ms')),
    ]),

    trigger('slashOpacity', [
      state('0', style({ opacity: "0" })),
      state('1', style({ opacity: "1" })),
      transition('0 => 1', animate('50ms ease-in')),
      transition('1 => 0', animate('800ms ease-out'))
    ]),
  ]
})

export class AppComponent implements OnInit
{
  public static rotatestate: string = '0';
  public static rotatestate2: string = '0';
  public static cropstate: string = '0';
  public static growstate: string = '0';
  public static son: any;
  public sonbtn: any;
  public titles: any;
  public allTitles: any;
  public recherche = "";
  public shop: any;
  public majInterval: any;

  public pseudo = "";
  public mdp = "";
  public message = "";
  public quartz = 0;
  public id = 0;
  public expand = true;
  public score = 0;
  public nextChangeBanner : any;
  public nextChangeBanners : any;
  public nextSQ : any;
  public nextSQs : any;
  public user: any;
  public compo = false;
  public recordOpen = false;

  public vid: any;
  public load: boolean = false;
  public persosToInvoq: any[] = [];
  public perso4: any;
  public persos4: any[] = [];
  public perso5: any;
  public persos5: any[] = [];
  public data: any = DATA;
  public succ: any = SUCC;
  public state: string = "connection";
  public video: string = "";
  public timing: number;
  public invocs: number;
  public persosInvoqued: any[];
  public userData: any[];
  public filters: string[] = [];
  public CEInterval: any;
  public sub: any;
  public users: any;
  public banner: any;
  public bannerInterval: any;
  public dailyInterval: any;
  public filterSell = "";
  public filterSellAvailable = false;

  public timerBanner: any = 5000000;
  public timerQuartz: any = 5000000;
  public timerInterval: any;
  public showEssences = false;
  public focus: any;
  public selectedServ: any;
  public persoToSell: any;
  public persoToExchange: any;
  public sellWithTitle: any;
  public sellType = "trade";
  public exchangeWithTitle: any;
  public sellQuartz="";
  public succesOpen = false;
  public success: any[] = [];
  public successToClaim: any[] = [];
  public notPulled = false;
  public profile: any = undefined;
  public cantSell: any = [];
  public cantSellTitle: any = [];
  public pvps: any[] = [];
  public pvp: any;

  public static revealed: boolean = false;
  public static perso: any;
  public static show: boolean = false;
  public static interval: any;
  public levels: any[] = [];

  public createVente = false;
  public profiles: any[] = [];
  public myprofile: any;
  public myprofiledata: any;
  public myprofilestats: any;
  public profiledesc: any;
  public selectServant: any;
  public ind: any = -1;
  public confirmTransfert = "Transfert Smurf";
  public filterSpec = "";
  public enhance = false;
  public ce: number[] = [0,0,0,0,0];
  public ascs: any[] = [];
  public duel: any[] = [];

  public idleState: number[] = [0,0,0,0];
  public idleState2: number[] = [0,0,0,0];
  public arriveState: number[] = [0,0,0,0];
  public arriveState2: number[] = [0,0,0,0];
  public idleInterval: any;
  public arriveInterval: any;
  public arriveLeft: string = "0";
  public arriveRight: string = "0";
  public titlesduel: any[] = [];
  public titlesduel2: any[] = [];

  public idpersotest = 342;
  public scaletest = 1;
  public test = false;

  public adversaire: any = undefined;
  public team1: any[] = [];
  public team2: any[] = [];
  public xs1: any[] = [560,465,360,155];
  public ys: any[] = [575,630,695,720];
  public xs2: any[] = [1440,1505,1640,1740];
  public idleStateNumber: any[] = ["0","0","0","0"];
  public idleStateNumber2: any[] = ["0","0","0","0"];

  public combatInterval: any;
  public place:any = 0;
  public attaquant1:any = -1;
  public attaquant2:any = -1;
  public attaqueInterval: any;
  public timerAttaque = 0;
  public musiquecombat: any;
  public attaquestate = 0;
  public dmgs:any = [];

  public teamattaque = 0;

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    //temps de co
    //son vidéo servant ao
    //defis
    //choix favori
    //bouton son
    //video + rapide
    //voir pokedex autres avec option desactiver
    //craft essence
    //succès
    //token garde compte
    //refresh auto donnees

    this.timerInterval = setInterval(() => {
      this.timerBanner -= 1000;
      this.timerQuartz -= 1000;
      this.nextSQ = Math.floor(this.timerQuartz/60000);
      this.nextSQs = Math.floor((this.timerQuartz%60000)/1000);
      this.nextChangeBanner = Math.floor(this.timerBanner/60000);
      this.nextChangeBanners = Math.floor((this.timerBanner%60000)/1000);

      if(this.timerQuartz<=0)
      {
        this.timerQuartz = 400000;
        this.spendQuartz(-1);
      }
      if(this.timerBanner<=0)
      {
        this.timerBanner = 1800000;
        this.generateBanner();
      }
  },1000);

    this.getBanner();
    AppComponent.son = new Audio();
    AppComponent.son.src = "./assets/Chaldea.ogg";
    AppComponent.son.load();
    AppComponent.son.volume = 0.1;
    AppComponent.son.loop = true;

    this.sonbtn = new Audio();
    this.sonbtn.src = "./assets/confirm_button.mp3";
    this.sonbtn.load();
    this.sonbtn.volume = 0.5;

    this.musiquecombat = new Audio();
    this.musiquecombat.src = "./assets/combat.mp3";
    this.musiquecombat.load();
    this.musiquecombat.volume = 0;

    document.oncontextmenu = function () {
      return false;
    }
  }

  public daily()
  {
    let date = new Date(this.user.daily);
    let now = new Date(Date.now());
    if(date.getDate()!=now.getDate())
    {
      this.spendQuartz(-30);
      const dataToSend = {
        id:this.id
      }
      from(
        fetch(
          'https://www.chiya-no-yuuki.fr/FATEdaily',
          {
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'no-cors',
          }
        )
      );
    }
  }

  public generateBanner()
  {
    this.persos5 = [];
    this.persos4 = [];

    let persos = this.data.filter((d:any)=>d.level==5&&d.nom!="Craft Essence");
    let alea = Math.floor(Math.random()*persos.length);
    this.perso5 = persos[alea];
    persos.splice(alea,1);
    for(let i=0;i<10;i++)
    {
      alea = Math.floor(Math.random()*persos.length);
      this.persos5.push(persos[alea]);
      persos.splice(alea,1);
    }

    persos = this.data.filter((d:any)=>d.level==4&&d.nom!="Craft Essence");
    alea = Math.floor(Math.random()*persos.length);
    this.perso4 = persos[alea];
    persos.splice(alea,1);
    for(let i=0;i<10;i++)
    {
      alea = Math.floor(Math.random()*persos.length);
      this.persos4.push(persos[alea]);
      persos.splice(alea,1);
    }
    this.reinitBanner();
    this.saveBanner();
  }

  setProfile(id:any)
  {
    this.confirmTransfert = "Transfert Smurf";
    let tmp = this.profiles.find((p:any)=>p.user_id==id);
    if(tmp) this.myprofile = tmp;
    else this.myprofile = {servs:[]};
    this.profile = id;
    this.myprofiledata = this.users.find((u:any)=>u.id==id);
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetProfilesData?id=' + id).subscribe(data=>
    {
      this.myprofilestats = data[0];
    });
  }

  public resetVid()
  {
    this.vid = document.getElementById("video1") as any;
    if(this.vid)
    {
      this.vid.addEventListener('loadeddata', function() {
            AppComponent.loadedVid();
        }, false);
        this.vid.src = "./assets/videos/"+this.video+".mp4"
        this.vid.volume = 0.1;
        this.vid.currentTime = 0;
        this.vid.play();
    }
    else
    {
      AppComponent.loadedVid();
    }
  }

  public static loadedVid()
  {
    clearInterval(AppComponent.interval);
    AppComponent.interval = setInterval(() => {
      AppComponent.show = true;
      clearInterval(AppComponent.interval);
      AppComponent.rotatestate = "1";
      AppComponent.rotatestate2 = "1";
        clearInterval(AppComponent.interval);
        AppComponent.interval = setInterval(() => {
          AppComponent.revealed = true;
           if(AppComponent.perso.nom!="Craft Essence")AppComponent.cropstate = "1";
          clearInterval(AppComponent.interval);
          AppComponent.interval = setInterval(() => {
            AppComponent.growstate = "1";
            clearInterval(AppComponent.interval);
            AppComponent.interval = setInterval(() => {
              AppComponent.growstate = "0";
              clearInterval(AppComponent.interval);
          },500);
        },this.perso.nom == "Craft Essence"?1500:3000);
      },this.perso.nom == "Craft Essence"?700:3200);
    },this.perso.nom == "Craft Essence"?3000:5000);
  }

  cantInvoq(nb:number){
    return this.quartz<nb*3 || this.persosToInvoq.length!=10;
  }

  startSummon(nb:number)
  {
    if(this.quartz<nb*3)
    {
      return;
    }
    this.sonbtn.play();
    for(let i=0;i<nb;i++)
    {
      this.addServant(this.id,this.persosToInvoq[i],1);
    }
    this.spendQuartz(nb*3);
    this.addpull(nb);
    this.persosInvoqued = [];
    this.invocs = nb;
    this.summon();
    this.getTitles();
  }

  getPersoTest()
  {
    return this.data.find((d:any)=>d.id==this.idpersotest);
  }

  getSpritePerso()
  {
    let perso = this.getPersoTest();
    return this.getSprite(perso);
  }

  public summon()
  {
    let perso = this.persosToInvoq.shift();
    this.invocs--;
    this.persosInvoqued.push(perso);
    AppComponent.perso = perso;
    this.state="invocation";
    AppComponent.son.pause();
    this.load = false;
    AppComponent.show = false;
    AppComponent.revealed = false;
    AppComponent.rotatestate = "0";
    AppComponent.rotatestate2 = "0";
    AppComponent.cropstate = "0";
    AppComponent.growstate = "0";
    
    this.loadPerso();
    this.load = true;
    if(AppComponent.perso.nom=="Craft Essence")
    {
      this.video = "essence";
    }
    else if(AppComponent.perso.level==5)
    {
      let rdm2 = Math.floor(Math.random()*10);
      if(rdm2<5){this.video = "rainbow";}
      else if(rdm2<8){this.video = "gold";}
      else {this.video = "3star";}
    }
    else if(AppComponent.perso.level==4)
    {
      let rdm2 = Math.floor(Math.random()*10);
      if(rdm2<8){this.video = "gold";}
      else {this.video = "3star";}
    }
    else
    {
      this.video = "3star";
    }
    this.resetVid();
  }
  
  loadPersos()
  {
    for(let i=0;i<10;i++)
    {
      this.loadPerso();
    }
  }

  loadPerso()
  {
    let perso: any;
    let rdm = Math.floor(Math.random()*1000);
    if(rdm==666)
    {
      let persos = this.data.filter((d:any)=>d.level==0&&d.nom!="Craft Essence");
      perso = persos[0];
    }
    else
    {
      rdm = Math.floor(Math.random()*100);
      //5*
      if(rdm<2)
      {
        let rdm2 = Math.floor(Math.random()*2);
        if(rdm2==0)
        {
          perso = this.perso5;
        }
        else
        {
          let rdm3 = Math.floor(Math.random()*2);
          if(rdm3==0)
          {
            let rdm4 = Math.floor(Math.random()*10);
            perso = this.persos5[rdm4];
          }
          else
          {
            let persos = this.data.filter((d:any)=>d.level==5&&d.nom!="Craft Essence");
            let alea = Math.floor(Math.random()*persos.length);
            perso = persos[alea];
          }
        }
      }
      //4*
      else if(rdm<7)
      {
        let rdm2 = Math.floor(Math.random()*2);
        if(rdm2==0)
        {
          perso = this.perso4;
        }
        else
        {
          let rdm3 = Math.floor(Math.random()*2);
          if(rdm3==0)
          {
            let rdm4 = Math.floor(Math.random()*10);
            perso = this.persos4[rdm4];
          }
          else
          {
            let persos = this.data.filter((d:any)=>d.level==4&&d.nom!="Craft Essence");
            let alea = Math.floor(Math.random()*persos.length);
            perso = persos[alea];
          }
        }
      }
      else if(rdm<55)
      {
        let persos = this.data.filter((d:any)=>(d.level==3||d.level==2||d.level==1)&&d.nom!="Craft Essence");
        let alea = Math.floor(Math.random()*persos.length);
        perso = persos[alea];
      }
      else if(rdm<=61)
      {
        perso = this.data.filter((d:any)=>d.nom=="Craft Essence"&&d.level==5)[0];
      }
      else if(rdm<=78)
      {
        perso = this.data.filter((d:any)=>d.nom=="Craft Essence"&&d.level==4)[0];
      }
      else
      {
        let rdm2 = Math.floor(Math.random()*3);
        if(rdm2==0)perso = this.data.filter((d:any)=>d.nom=="Craft Essence"&&d.level==3)[0];
        else if(rdm2==1)perso = this.data.filter((d:any)=>d.nom=="Craft Essence"&&d.level==2)[0];
        else if(rdm2==2)perso = this.data.filter((d:any)=>d.nom=="Craft Essence"&&d.level==1)[0];
      }
    }
    this.persosToInvoq.push(perso);
  }
  getServLevel()
  {
    let level = 0;
    let tmp = this.levels.find((l:any)=>l.user_id == this.id && l.servant_id == this.selectedServ.id);
    if(tmp)level = tmp.level;
    return level;
  }

  getServLevel2(perso:any)
  {
    let level = 0;
    let tmp = this.levels.find((l:any)=>l.user_id == this.id && l.servant_id == perso.id);
    if(tmp)level = tmp.level;
    return level;
  }

  disabledAsc(i:number)
  {
    let level = this.getServLevel();
    if(i==0)return false;
    else if(i==1)return level<31;
    else if(i==2)return level<61;
    else return level<100;
  }

  getLevel()
  {
    let limit = this.getLimit();
    let level = 0;
    let tmp = this.levels.find((l:any)=>l.user_id == this.id && l.servant_id == this.selectedServ.id);
    if(tmp)level = tmp.level;
    level = level + this.ce[0]*1+this.ce[1]*2+this.ce[2]*3+this.ce[3]*4+this.ce[4]*5;
    return level>limit?limit:level;
  }

  hasDoublon()
  {
    return this.userData.find((u:any)=>u.id==this.selectedServ.id).qte>1;
  }

  isLevelCap()
  {
    let limit = this.getLimit();
    let level = 0;
    let tmp = this.levels.find((l:any)=>l.user_id == this.id && l.servant_id == this.selectedServ.id);
    if(tmp)level = tmp.level;
    if(level==limit)return true;
    return false;
  }

  getMore()
  {
    return this.ce[0]*1+this.ce[1]*2+this.ce[2]*3+this.ce[3]*4+this.ce[4]*5;
  }

  getImage(){
      return AppComponent.perso && AppComponent.perso.img1;
  }

  getCE()
  {
    let tmp = this.data.filter((d:any)=>d.nom=="Craft Essence");
    tmp.forEach((t:any)=>{
      let tmp2 = this.userData.find((u:any)=>u.id==t.id);
      if(tmp2) tmp.qte = tmp2.qte;
      else tmp.qte = 0;
    });
    return tmp;
  }

  getBack(){
    if(AppComponent.perso.special)return "./assets/images/back/gspecial.jpg";
    if(!AppComponent.perso)return "./assets/images/back/saber.png";
    
      let retour: string = "";
      if(AppComponent.perso.level > 3)
      {
        retour += "g";
      }
      retour += AppComponent.perso.classe;
      retour = retour.toLowerCase();
      retour = retour.replace(/ /g,"");
      return "./assets/images/back/" + retour + ".png";
  }
  
  isShow(){
    return AppComponent.show;
  }

  isCE(){
    return AppComponent.perso && AppComponent.perso.nom == "Craft Essence";
  }

  getBorder()
  {
    if(!AppComponent.perso)return "./assets/images/borders/" + 1 + ".png";
    return "./assets/images/borders/" + AppComponent.perso.level + ".png";
  }

  videoEnd()
  {
    if(this.invocs>0){this.summon();}
    else{
      this.getUserData(true);
      this.state = "recap";
      AppComponent.son.play();
    }
  }

  getIdleState(i:number){
    return this.idleStateNumber[i];
  }
  getIdleState2(i:number){
    return this.idleStateNumber2[i];
  }
  getName(){
    return AppComponent.perso.nom;
  }
  getRotateState(){
    return AppComponent.rotatestate;
  }
  getRotateState2(){
    return AppComponent.rotatestate2;
  }
  getCropState(){
    return AppComponent.cropstate;
  }
  getGrowState(){
    return AppComponent.growstate;
  }
  revealed(){return AppComponent.revealed;}

  getPvp()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetPvp').subscribe(pvp=>
    {
      this.pvps = pvp;
      this.pvp = pvp.find((p:any)=>p.user_id==this.id);

      this.profiles.forEach((pro:any)=>{
        let pvp = this.pvps.find((p:any)=>p.user_id==pro.user_id);
        if(pvp)
        {
          pro.compo = pvp.team;
          pro.titlescompo = pvp.titles;
          pro.comp = [];
          pro.compo.forEach((c:any)=>pro.comp.push(this.data.find((d:any)=>d.id==c)));
        }
        else
        {
          pro.compo = [];
          pro.comp = [];
          pro.titlescompo = [];
        }
      });
      //this.myprofile = this.profiles.find((p:any)=>p.user_id==this.id)
    });
  }

  connect(afterCreate:boolean){
    if(this.pseudo.length<3||this.mdp.length<3||this.pseudo.length>20||this.mdp.length>20)
    {
      return;
    }
    this.sonbtn.play();
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetUser?nom=' + this.pseudo + '&mdp=' + this.mdp).subscribe(data=>
    {
      if(data.length==0&&afterCreate)
      {
        this.message = "Pseudo déjà existant.";
      }
      else if(data.length==0)
      {
        this.message = "Pseudo ou mot de passe incorrect.";
      }
      else
      {
        this.user = data[0];
        this.quartz = data[0].quartz;
        this.id = data[0].id;
        this.score = data[0].score;
        this.getUserData(false);
        this.getUsers();
        this.conn();
        this.getLevels();
        this.getTitles();
        this.getShop();
        this.getProfiles();
        this.getLevels();
        this.state = "banner";
        AppComponent.son.play();
        this.timerQuartz = 400000;
        this.daily();
        this.getPvp();
      }
    });
  }

  getLevels()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetLevels?').subscribe(data=>
    {
      this.levels = data;
    });
  }

  addSuccess(id:any)
  {
    const dataToSend = {
      id:id,
      userid:this.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEaddSuccess',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  getRdm()
  {
    return Math.round(Math.random()*15)*100+300;
  }
  getRdm2()
  {
    return Math.round(Math.random()*500)+300;
  }

  checkSuccess()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetSuccess?id=' + this.id).subscribe(data=>
    {
      this.successToClaim = data.filter((d:any)=>d.claimed==0);
      if(!this.successToClaim) this.successToClaim = [];
      this.successToClaim = this.successToClaim.map((s:any)=>{return this.succ.find((c:any)=>c.id==s.id)});

      let classes = ["Alter Ego", "Archer", "Assassin", "Avenger", "Beast", "Berserker", "Caster", "Foreigner", "Lancer", "Moon Cancer", "Pretender", "Rider", "Ruler", "Saber", "Shielder"];
      let nbclasses: any[] = [];
      let nbclassesmax: any[] = [];
      classes.forEach((c:any)=>
      {
        nbclasses.push(this.userData.filter((u:any)=>u.classe==c).length);
        nbclassesmax.push(this.data.filter((u:any)=>u.classe==c).length);
      });
      let nb30 = this.levels.filter((d:any)=>d.user_id==this.id&&d.level>30).length;
      let nb60 = this.levels.filter((d:any)=>d.user_id==this.id&&d.level>60).length;
      let nb100 = this.levels.filter((d:any)=>d.user_id==this.id&&d.level==100).length;

      let nb = this.userData.filter((u:any)=>u.nom!="Craft Essence").length;
      let nb5 = this.userData.filter((u:any)=>u.level==5&&u.nom!="Craft Essence").length;
      let nb4 = this.userData.filter((u:any)=>u.level==4&&u.nom!="Craft Essence").length;
      let tmp = this.titles;
      if(tmp)
      {
        tmp = tmp.map((x:any)=>
        {
          return this.data.find((y:any)=>y.id==x);
        });
      }
      else tmp = [];
      let nbtot = 0;
      this.userData.forEach((d:any)=>{if(d.nom!="Craft Essence")nbtot+=d.qte});
        
      let nbt = tmp.filter((t:any)=>t.level>3&&t.nom!="Craft Essence").length;
      let nbs = this.userData.filter((u:any)=>u.nom!="Craft Essence").length;

      //succès classes

      let id = 1000;
      let ind = 0;
      classes.forEach((c:any)=>
      {
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>0)
          {
            let succ = {id:id,nom:"My first "+c,desc:"Obtenir son premier servant de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>4)
          {
            let succ = {id:id,nom:"A little group of "+c,desc:"Obtenir 5 servants de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>9)
          {
            let succ = {id:id,nom:"A bunch of "+c,desc:"Obtenir 10 servants de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>19)
          {
            let succ = {id:id,nom:"An army of "+c,desc:"Obtenir 20 servants de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>29)
          {
            let succ = {id:id,nom:"Plenty of "+c,desc:"Obtenir 30 servants de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>39)
          {
            let succ = {id:id,nom:"A city of "+c,desc:"Obtenir 40 servants de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]>49)
          {
            let succ = {id:id,nom:"A world of "+c,desc:"Obtenir 50 servants de classe "+c,recompense:5};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        if(!data.find((d:any)=>d.id==id))
        {
          if(nbclasses[ind]==nbclassesmax[ind])
          {
            let succ = {id:id,nom:"YOU GOT THEM ALL"+c,desc:"Obtenir tous les servants de classe "+c,recompense:20};
            this.addSuccess(id);
            this.successToClaim.push(succ);
          }
        }
        id++;
        ind++;
        id=1000+ind*100;
      });

      //succès généraux
      
      let cpt=1;
      if(!data.find((d:any)=>d.id==cpt))
      {
        this.addSuccess(cpt);
        this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
      }
      cpt=2;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=3;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=4;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb5>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=5;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>4)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=6;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=7;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=8;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb5>4)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=9;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb5>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=10;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb5>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=11;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(this.userData.find((d:any)=>d.id==107))
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=12;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(this.userData.find((d:any)=>d.id==0))
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=14;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=15;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>4)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=16;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=17;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=18;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=19;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=20;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>39)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=21;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>59)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=22;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>79)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=23;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb>99)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=24;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbtot>49)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=25;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbtot>99)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=26;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbtot>199)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=27;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbtot>499)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=28;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb5>29)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=29;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb5>39)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=30;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>29)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=31;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>39)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=32;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>49)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=33;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>29)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=34;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>129)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=35;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>159)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=36;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbs>199)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=37;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbtot>999)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=38;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>59)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=39;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>69)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=40;
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>79)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=41
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb4>89)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=42
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>39)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=43
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>49)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=44
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nbt>59)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=45
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(this.userData.find((d:any)=>d.id==1))
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=46
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb30>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=47
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb30>4)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=48
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb30>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=49
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb60>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=50
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb60>4)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=51
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb60>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=52
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb100>0)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=53
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb100>4)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=54
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb100>9)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=55
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb100>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=56
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb60>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
      cpt=57
      if(!data.find((d:any)=>d.id==cpt))
      {
        if(nb30>19)
        {
          this.addSuccess(cpt);
          this.successToClaim.push(this.succ.find((c:any)=>c.id==cpt));
        }
      }
    }); 
  }

  claimSuccess(success:any)
  {
    this.successToClaim.splice(this.successToClaim.indexOf(success),1);
    this.spendQuartz(success.recompense*-1);
    const dataToSend = {
      id:success.id,
      userid:this.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEclaimSuccess',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  refreshUser()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetUser?nom=' + this.pseudo + '&mdp=' + this.mdp).subscribe(data=>
    {
        this.quartz = data[0].quartz;
    });
  }

  conn()
  {
    const dataToSend = {
      id:this.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEconn',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  getTitles()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEtitles?id=' + this.id).subscribe(data=>
    {
      this.titles = data.map((x:any)=>
      {
        let tmp = this.data.find((y:any)=>y.id==x.servant_id).id;
        return tmp;
      });
      this.titles = this.titles.filter((d:any)=>this.data.find((x:any)=>x.id==d).nom!="Craft Essence");
    });
  }

  getAllTitles()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEallTitles').subscribe(data=>
    {
      this.allTitles = data.map((x:any)=>
      {
        let tmp = this.data.find((y:any)=>y.id==x.servant_id).id;
        return tmp;
      });
      this.allTitles = this.allTitles.filter((d:any)=>this.data.find((x:any)=>x.id==d).nom!="Craft Essence");
      this.allTitles = this.allTitles.filter((d:any)=>this.data.find((x:any)=>x.id==d).level>3);
    });
  }

  got(quartz:number,servant:any,servantWithTitle:any)
  {
    if(quartz!=-1)
    {
      return this.quartz>=quartz;
    }
    else if(servant)
    {
      let tmp = this.getData();
      tmp = tmp.find((d:any)=>d.id==servant.id);
      if(!tmp)return false;
      if(servant.level>3 && this.titles.includes(servant.id) && servant.qte == 1) return false;
      return true;
    }
    else
    {
      let tmp = this.getData();
      return tmp.find((d:any)=>d.id==servantWithTitle.id) && this.titles.includes(servantWithTitle.id);
    }
  }

  getShops()
  {
    let shop = this.shop;
    if(this.filterSell=="Mes Ventes")
    {
      shop = shop.filter((s:any)=>s.nom==this.user.nom);
    }
    else if(this.filterSell=="Achat Quartz")
    {
      shop = shop.filter((s:any)=>s.price_quartz!=-1&&s.nom!=this.user.nom);
    }
    else if(this.filterSell=="Achat Echanges")
    {
      shop = shop.filter((s:any)=>(s.servantPrice||s.servantPriceWithTitle)&&s.nom!=this.user.nom);
    }

    if(this.filterSellAvailable)
    {
      shop = shop.filter((s:any)=>this.got(s.price_quartz,s.servantPrice,s.servantPriceWithTitle)&&s.nom!=this.user.nom);
    }

    if(this.recherche!=""&&!this.createVente)
    {
      let regexp = new RegExp('.*'+this.recherche.toLowerCase()+'.*');
      shop = this.shop.filter((s:any)=>
        s.nom.toLowerCase().match(regexp) ||
        (s.servant && s.servant.nom.toLowerCase().match(regexp)) ||
        (s.servantPrice && s.servantPrice.nom.toLowerCase().match(regexp)) ||
        (s.servantWithTitle && s.servantWithTitle.nom.toLowerCase().match(regexp)) ||
        (s.servantPriceWithTitle && s.servantPriceWithTitle.nom.toLowerCase().match(regexp))
      );
    }

    shop = shop.filter((s:any)=>s.bought_user_id==-1);
    return shop;
  }

  alreadyPulled()
  {
    return this.allTitles.includes(this.selectedServ.id);
  }

  setTitle()
  {
    if(this.user.title!=this.selectedServ.nom)
    {
      this.user.title = "Master of " + this.selectedServ.nom;
      const dataToSend = {
        id:this.id,
        title:"Master of " + this.selectedServ.nom
      }
      from(
        fetch(
          'https://www.chiya-no-yuuki.fr/FATEsetTitle',
          {
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'no-cors',
          }
        )
      );
    }
  }

  getTotalHp()
  {
    let tot1 = 0;
    this.team1.forEach((t:any)=>{tot1+=t.pdv})
    let tot2 = 0;
    this.team2.forEach((t:any)=>{tot2+=t.pdv})

    return Math.round((tot1/(tot1+tot2))*100);
  }

  getTot(i:any)
  {
    let tot1 = 0;
    this.team1.forEach((t:any)=>{tot1+=t.pdv})
    let tot2 = 0;
    this.team2.forEach((t:any)=>{tot2+=t.pdv})

    if(i==0)
      return Math.round((tot1/(tot1+tot2))*100);
    else
      return Math.round((tot2/(tot1+tot2))*100);
  }

  first(serv:any)
  {
    return this.titles.includes(serv.id) || (serv.level < 4&&serv.nom!="Craft Essence"&&this.userData.find((d:any)=>d.id==serv.id));
  }

  golden(id:any)
  {
    let lessthan4 = this.data.find((d:any)=>d.id==id).level<4;
    return this.titles.includes(id) && !lessthan4;
  }

  getUsers(){
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetUsers').subscribe(data=>
    {
      this.users = data;

      this.users.forEach((u:any)=>{
        let ecart = this.getEcart(u.last,false,true,false);
        u.last = ecart;
        ecart = this.getEcart(u.conn,false,false,false);
        let ecartActivite = this.getEcart(u.maj,false,false,true);
        if(ecartActivite as number > 7) ecart = "Déconnecté"
        u.conn = ecart;
      });      

      this.users.sort((a: any,b: any) => b.score - a.score);
      this.getAllTitles();
    });
  }

  getEcart(date:any,getSec:boolean, ilya: boolean, getmin: boolean){
    date = new Date(date);
    let now = new Date(Date.now());
    let ecart = now.getTime()-date.getTime();
    let jour = 1000*60*60*24;
    let jours = Math.floor(ecart / jour);
    ecart = ecart - jours * jour;
    let heure = 1000*60*60;
    let heures = Math.floor(ecart / heure);
    ecart = ecart - heures * heure;
    let minute = 1000*60;
    let minutes = Math.floor(ecart / minute);
    ecart = ecart - minutes * minute;
    let seconde = 1000;
    let secondes = Math.floor(ecart / seconde);
    let retour = "";

    if(jours>0)   retour += (jours<10?'0':'') + jours + ' jour' + (jours>1?'s':'') + ' ';
    else if(ilya) retour += "Il y a ";
    retour += (heures<10?'0':'') + heures + 'h';
    retour += (minutes<10?'0':'') + minutes + 'm';
    if(getSec)  retour += (secondes<10?'0':'') + secondes + 's';

    if(jours==0&&heures==0&&minutes<5&&ilya)retour = "A l'instant"

    if(getmin)return minutes;
    return retour;
  }

  playButton(){
    this.sonbtn.play();
  }

  createAcc()
  {
    if(this.pseudo.length<3||this.mdp.length<3||this.pseudo.length>20||this.mdp.length>20)
    {
      return;
    }
    this.sonbtn.play();
    const dataToSend = {
      nom:this.pseudo,
      mdp:this.mdp
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEaddUser',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe((response) => 
    {
      this.connect(true);
    })
  }

  spendQuartz(qte:number)
  {
    const dataToSend = {
      nom:this.pseudo,
      qte:qte
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEspendQuartz',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe(e=>{
      this.refreshUser();
    });
  }

  spendQuartz2(qte:number)
  {
    const dataToSend = {
      id:this.users.find((u:any)=>u.id==this.adversaire).nom,
      qte:qte
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEspendQuartz',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe(e=>{
      this.refreshUser();
    });
  }

  getShop()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEshop').subscribe(data=>
    {
      this.cantSell = [];
      data.forEach((d:any)=>
      {
        if(d.bought_user_id==-1 && d.nom == this.user.nom)
        {
          if(d.servant_id!=-1)this.cantSell.push(d.servant_id);
          if(d.servant_id_with_title!=-1)this.cantSell.push(d.servant_id_with_title);
        }
      });

      this.shop = data.map((x:any)=>
      {
        let tmp = x;
        if(x.servant_id_with_title!=-1)tmp.servantWithTitle = this.data.find((y:any)=>y.id==x.servant_id_with_title);
        if(x.servant_id!=-1)tmp.servant = this.data.find((y:any)=>y.id==x.servant_id);
        if(x.price_servant_id!=-1)tmp.servantPrice = this.data.find((y:any)=>y.id==x.price_servant_id);
        if(x.price_servant_id_with_title!=-1)tmp.servantPriceWithTitle = this.data.find((y:any)=>y.id==x.price_servant_id_with_title);
        return tmp;
      });
    });
  }

  getProfile(id:any)
  {
    let tmp = this.profiles.find((p:any)=>p.user_id==id);
    if(tmp)
    {
      return tmp;
    }
    else
    {
      return {};
    }
  }

  isGold(id:any)
  {
    let tmp = this.getProfile(id);
    if(tmp.titleserv&&tmp.titleserv==1)
    {
      return true;
    }
    else return false;
  }

  clickServantProfile(i:any)
  {
    this.compo = false;
    this.selectServant=true;
    this.state='formation';
    if(i==-1)this.filterSpec="Titles";
    this.profile=undefined;
    this.ind=i;
  }

  clickServantProfileCompo(i:any)
  {
    this.compo = true;
    this.selectServant=true;
    this.state='formation';
    this.profile=undefined;
    this.ind=i;
  }

  transfert()
  {
    if(this.confirmTransfert=="Transfert Smurf")
    {
      this.confirmTransfert = "Valider transfert ?"
    }
    else
    {
      this.confirmTransfert=="Transfert Smurf";
      this.profile = undefined;
      if(this.user.smurf!=0)
      {
        const dataToSend = {
          id:this.id,
          smurf:this.user.smurf
        }
        from(
          fetch(
            'https://www.chiya-no-yuuki.fr/FATEtransfert',
            {
              body: JSON.stringify(dataToSend),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              mode: 'no-cors',
            }
          )
        ).subscribe(e=>{
          this.getUserData(true);
        });
      }
    }
  }

  getProfiles()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetProfiles').subscribe(data=>
    {
      this.profiles = data;
      this.profiles.forEach((p:any)=>{
        if(p.servant_id!=-1)p.servant = this.data.find((d:any)=>d.id==p.servant_id);
        let tmp:any[] = [];
        p.servants.forEach((s:any)=>{
          tmp.push(this.data.find((d:any)=>d.id==s));
        })
        p.servs = tmp;
        tmp = [];
        if(!p.titleservs||p.titleservs == null) p.titleservs = [];
      });
      if(!this.profiles.find((p:any)=>p.user_id==this.id))
      {
        let prof = {user_id:this.id,servant_id:-1,servants:[],description:'Pas de description..',succes:[],servs:[],titleserv:-1,titleservs:[],compo:[],titlescompo:[]};
        this.profiledesc = "Pas de description..";
        this.myprofile = prof;
        this.profiles.push(prof);
        const dataToSend = {
          userid:this.id
        }
        from(
          fetch(
            'https://www.chiya-no-yuuki.fr/FATEaddProfile',
            {
              body: JSON.stringify(dataToSend),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              mode: 'no-cors',
            }
          )
        );
      }
      else
      {
        this.myprofile = this.profiles.find((p:any)=>p.user_id==this.id)
        this.profiledesc = this.myprofile.description;
      }
    });
  }

  descProfile()
  {
    this.myprofile.description = this.profiledesc;
    const dataToSend = {
      userid:this.id,
      desc:this.profiledesc
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEdescProfile',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }


  addServant(userid:any, perso:any, qte:number)
  {
    const dataToSend = {
      userid:userid,
      servantid:perso.id,
      level:perso.level,
      qte:qte
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEaddServant',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  getUserData(calc:boolean)
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetUserData?id=' + this.id).subscribe(data=>
    {
      this.userData = data.map((x:any)=>
      {
        let tmp = this.data.find((y:any)=>y.id==x.servantid);
        tmp.qte = x.qte;
        return tmp;
      });
      if(calc)
      {
        this.calc();
      }
    });
  }

  setBanner()
  {
    this.perso5 = this.data.find((d:any)=>d.id==this.banner.boost5);
    this.perso4 = this.data.find((d:any)=>d.id==this.banner.boost4);
    let tmp: any[] = [];
    this.banner.boost5group.forEach((d:any)=>tmp.push(this.data.find((p:any)=>p.id==d)))
    this.persos5 = tmp;
    tmp = [];
    this.banner.boost4group.forEach((d:any)=>tmp.push(this.data.find((p:any)=>p.id==d)))
    this.persos4 = tmp;
    this.reinitBanner();
  }

  getBanner()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetBanner').subscribe(data=>
    {
      this.banner = data[0];
      this.setBanner();
      let date = new Date(data[0].maj);
      let now = Date.now();
      let ecart = now-date.getTime();
      ecart = ecart/1000;//secondes
      ecart = ecart/60;//minutes
      if(ecart>30)
      {
        this.generateBanner();
        this.timerBanner = 30*60000;
      }
      else
      {
        ecart = ecart*60000;
        let restant = 30*60000 - ecart;
        this.timerBanner = restant;
      }
    });
  }

  reinitBanner(){
    this.persosToInvoq = [];
    this.loadPersos();
  }

  saveBanner()
  {
    let boost5group = "[";
    this.persos5.forEach((p:any) => boost5group+=(p.id)+",");
    boost5group=boost5group.substring(0,boost5group.length-1) + "]";

    let boost4group = "[";
    this.persos4.forEach((p:any) => boost4group+=(p.id)+",");
    boost4group=boost4group.substring(0,boost4group.length-1) + "]";

    const dataToSend = {
      boost5:this.perso5.id,
      boost4:this.perso4.id,
      boost5group:boost5group,
      boost4group:boost4group
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEchangeBanner',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe((response) => 
    {
      this.getBanner();
    });
  }

  clickServant(perso:any)
  {
    this.ascs = [];
    this.enhance=false;
    this.selectedServ=perso;
  }

  addLevel()
  {
    let tmp = this.levels.find((l:any)=>l.user_id==this.id&&l.servant_id==this.selectedServ.id);
    let asc = 0;
    if(tmp)asc = tmp.ascension;

    let cartes = this.getCE();
    for(let i=0;i<5;i++)
    {
      let qte = this.ce[i];
      let serv = cartes[i];
      if(qte>0)
      {
        if(serv.qte-qte>0)
        {
          this.addServant(this.id,serv,qte*-1);
        }
        else
        {
          this.removeServant(this.id,serv);
        }
      }
    }

    const dataToSend = {
      id:this.id,
      servid:this.selectedServ.id,
      level:this.getLevel(),
      asc:asc
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEsetLevels',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe((response) => 
    {
      this.enhance = false;
      this.getLevels();
    });
  }  

  changeAscension(i:number)
  {
    const dataToSend = {
      id:this.id,
      servid:this.selectedServ.id,
      level:this.getServLevel(),
      asc:i
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEsetLevels',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe((response) => 
    {
      this.ascs = [];
      this.getLevels();
    });
  }

  ascension()
  {
    let tmp = this.levels.find((l:any)=>l.user_id==this.id&&l.servant_id==this.selectedServ.id);
    let asc = 0;
    if(tmp.level<=30&&this.selectedServ.img2)asc = 1;
    else if(tmp.level<=60&&this.selectedServ.img3)asc= 2;
    else if(this.selectedServ.img4) asc = 3;
    
    this.addServant(this.id,this.selectedServ,-1);

    const dataToSend = {
      id:this.id,
      servid:this.selectedServ.id,
      level:this.getServLevel()+1,
      asc:asc
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEsetLevels',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe((response) => 
    {
      this.enhance = false;
      this.getLevels();
      this.getUserData(false);
    });
  }

  getImg(id:any,perso:any)
  {
    let tmp = this.levels.find((l:any)=>l.user_id==id&&l.servant_id==perso.id);
    let img = perso.img1;
    if(tmp)
    {
      if(tmp.ascension==1)img = perso.img2;
      else if(tmp.ascension==2)img = perso.img3;
      else if(tmp.ascension==3)img = perso.img4;
    }
    return img;
  }

  getWidth(min:number,max:number)
  {
    return (min/max)*100;
  }

  endFight(t1:any,t2:any)
  {
    if(t2==0)this.spendQuartz(-3);
      else if(t1==0)this.spendQuartz2(-3);
      clearInterval(this.idleInterval);
      clearInterval(this.combatInterval);
      this.team1 = [];
      this.team2 = [];
      this.profile=this.adversaire;
      this.state="banner";
      return;
  }

  startDash()
  {
    let persoatq:any;
    let persocible:any;
    let i:any;
    let cible:any;

    let left1 = this.team1.filter((t:any)=>t.pdv>0);
    let left2 = this.team2.filter((t:any)=>t.pdv>0);
    let i1 = Math.round(Math.random()*(left1.length-1));
    let i2 = Math.round(Math.random()*(left2.length-1));

    if(left1.length==0||left2.length==0)
    {
      this.endFight(left1.length,left2.length);
      return;
    }

    if(this.teamattaque==0)
    {
      i = this.team1.indexOf(left1[i1]);
      cible = this.team2.indexOf(left2[i2]);
      persoatq = this.team1[i];
      persocible = this.team2[cible];
    }
    else
    {
      cible = this.team1.indexOf(left1[i1]);
      i = this.team2.indexOf(left2[i2]);
      persoatq = this.team2[i];
      persocible = this.team1[cible];
    }

    //Intelligence du coup
    let rdm = Math.round(Math.random()*99);
    if(rdm>20)
    {
      cible = this.getSmartCible(persoatq);
      console.log(persoatq.classe);
      console.log(persocible.classe,persocible.pdv);
      if(this.teamattaque==0)persocible = this.team2[cible];
      else persocible = this.team1[cible];
      console.log(persocible.classe,persocible.pdv);
      console.log("===========");
    }

    this.attaquant1 = i;
    this.place = cible;
    
    clearInterval(this.attaqueInterval);
    this.timerAttaque = 0;
    this.team1.forEach((tmp:any)=>{
      if(tmp.pdv>0)
      {
        tmp.animation = "idle";
        tmp.arrivex = 0;
      }
    });
    this.team2.forEach((tmp:any)=>{
      if(tmp.pdv>0)
      {
        tmp.animation = "idle";
        tmp.arrivex = 0;
      }
    })    
    this.dmgs.forEach((tmp:any)=>{
      tmp.timer+=2000;
      if(tmp.timer>6000)this.dmgs.splice(this.dmgs.indexOf(tmp),1);
    });

    let passiveShielder: any = this.passiveShielder();
    let persoshield: any;

    if(passiveShielder!=-1)
    {
      persoshield = persocible;
      persocible.atqanim = "Shielder";
      persocible.atqanimdecal = 0;
      persoshield.animation="Shield";
      persoshield.slash="1";
      cible = passiveShielder;
      if(this.teamattaque==0)persocible=this.team2[cible];
      else persocible=this.team1[cible];
      this.setAnimX2(cible,200,"dashavant",false);
    }

    persocible.atqanim = persoatq.classe;
    persocible.atqanimdecal = 0;
    if(persoatq.classe=="Lancer"||persoatq.classe=="Archer")persocible.atqanimdecal = 150;
    if(persoatq.classe=="Assassin")persocible.atqanimdecal = 50;
    
    this.setAnimX(i,200,"dashavant");
    this.attaqueInterval = setInterval(() => {
      if(this.timerAttaque==700)
      {
        let tmp = this.damage(i,cible);
        this.setAnimX(i,300,"coup");
        if(passiveShielder==-1)this.setAnimX2(cible,-100,"takedamage",tmp);
        else 
        {
          persoshield.animation="idle";
          persoshield.slash="0";
          this.setAnimX2(cible,-100,"takedamage",tmp);
        }
      }
      if(this.timerAttaque==900)
      {
        if(persocible.pdv>0)this.setAnimX2(cible,0,"idle",false);
        else this.setAnimX2(cible,0,"death",false);
        this.setAnimX(i,200,"dashavant");
        
      }
      if(this.timerAttaque==1300)
      {
        this.setAnimX(i,0,"idle");
        if(persocible.pdv>0)this.setAnimX2(cible,0,"endSlash",false);
        clearInterval(this.attaqueInterval);
      }
      this.timerAttaque+=100;
    },100);
  }

  getSmartCible(persoatq:any)
  {
    let classeatq = persoatq.classe;
    let focus = this.team1.filter((t:any)=>t.pdv>0);
    if(this.teamattaque==0)focus = this.team2.filter((t:any)=>t.pdv>0);

    if(focus.length==1)
    {
      if(this.teamattaque==0)return this.team2.indexOf(focus[0]);
      else return this.team1.indexOf(focus[0]);
    }

    focus.sort((a: any,b: any) => {return a.pdv - b.pdv});
    if(focus[1].pdv-focus[0].pdv>15000)
    {
      if(this.teamattaque==0)return this.team2.indexOf(focus[0]);
      else return this.team1.indexOf(focus[0]);
    }

    let tmpfocus:any = [];
    let boost: any = [];
    let malus: any = [];

    if(classeatq=="Alter Ego")
    {
      boost = ["Berserker","Assassin","Rider","Caster","Foreigner","Beast"];
      malus = ["Archer","Saber","Lancer","Pretender"];
    }
    else if(classeatq=="Pretender")
    {
      boost = ["Berserker","Saber","Archer","Lancer","Alter Ego","Beast"];
      malus = ["Rider","Caster","Assassin","Foreigner"];
    }
    else if(classeatq=="Foreigner")
    {
      boost = ["Berserker","Pretender","Beast"];
      malus = ["Alter Ego"];
    }
    else if(classeatq=="Archer")
    {
      boost = ["Berserker","Saber"];
      malus = ["Lancer","Beast","Ruler"];
    }
    else if(classeatq=="Saber")
    {
      boost = ["Berserker","Lancer"];
      malus = ["Archer","Beast","Ruler"];
    }
    else if(classeatq=="Lancer")
    {
      boost = ["Berserker","Archer"];
      malus = ["Saber","Beast","Ruler"];
    }
    else if(classeatq=="Assassin")
    {
      boost = ["Berserker","Rider"];
      malus = ["Caster","Beast","Ruler"];
    }
    else if(classeatq=="Rider")
    {
      boost = ["Berserker","Caster"];
      malus = ["Assassin","Beast","Ruler"];
    }
    else if(classeatq=="Caster")
    {
      boost = ["Berserker","Assassin"];
      malus = ["Rider","Beast","Ruler"];
    }
    else if(classeatq=="Ruler")
    {
      boost = ["Berserker","Moon Cancer","Beast"];
      malus = ["Avenger"];
    }
    else if(classeatq=="Moon Cancer")
    {
      boost = ["Berserker","Avenger","Beast"];
      malus = ["Ruler"];
    }
    else if(classeatq=="Avenger")
    {
      boost = ["Berserker","Ruler","Beast"];
      malus = ["Moon Cancer"];
    }
    else if(classeatq=="Berserker")
    {
      boost = ["Berserker","Archer","Saber","Lancer","Rider","Assassin","Caster","Ruler","Moon Cancer","Avenger","Pretender","Alter Ego","Beast"];
      malus = ["Foreigner"];
    }
    else if(classeatq=="Shielder")
    {
      boost = [];
      malus = [];
    }
    else if(classeatq=="Beast")
    {
      boost = ["Saber","Archer","Lancer","Rider","Assassin","Caster","Berserker"];
      malus = ["Moon Cancer","Ruler","Avenger","Alter Ego","Pretender","Foreigner"];
    }
    tmpfocus = focus.filter((f:any)=>boost.includes(f.classe));
    if(tmpfocus.length==0) tmpfocus = focus.filter((f:any)=>!malus.includes(f.classe));
    if(tmpfocus.length==0) tmpfocus = focus.filter((f:any)=>malus.includes(f.classe));
  
    tmpfocus.sort((a: any,b: any) => {return a.pdv - b.pdv});

    tmpfocus.forEach((t:any)=>console.log(t.classe,t.pdv));
    
    if(this.teamattaque==0)return this.team2.indexOf(tmpfocus[0]);
    else return this.team1.indexOf(tmpfocus[0]);
  }

  passiveShielder()
  {
    let ind = -1;
    if(this.teamattaque==0)
    {
      for(let i=0;i<this.team2.length;i++)
      {
        let perso = this.team2[i];
        if(ind==-1&&i!=this.place&&perso.pdv>0&&perso.classe=="Shielder")
        {
          let rdm = Math.round(Math.random()*99);
          rdm=2;//test
          if(rdm<20)ind = i;
        }
      }
    }
    else
    {
      for(let i=0;i<this.team1.length;i++)
      {
        let perso = this.team1[i];
        if(ind==-1&&i!=this.place&&perso.pdv>0&&perso.classe=="Shielder")
        {
          let rdm = Math.round(Math.random()*99);
          rdm=2;//test
          if(rdm<20)ind = i;
        }
      }
    }
    return ind;
  }

  getAtqAnim()
  {
    let retour = "Saber";
    if(this.teamattaque==0)
    {
      if(this.team1[this.attaquant1])
        retour = this.team1[this.attaquant1].classe;
    }
    else
    {
      if(this.team2[this.attaquant1])
        retour = this.team2[this.attaquant1].classe;
    }
    return retour;
  }
  getAtqAnimDecal()
  {
    let retour = 20;
    if(this.teamattaque==0)
    {
      if(this.team1[this.attaquant1])
        if(this.team1[this.attaquant1].classe=="Lancer"||this.team1[this.attaquant1].classe=="Archer")
          retour = 120;
    }
    else
    {
      if(this.team2[this.attaquant1])
        if(this.team2[this.attaquant1].classe=="Lancer"||this.team2[this.attaquant1].classe=="Archer")
          retour = 120;
    }
    return retour;
  }

  damage(atq:any,cible:any)
  {
    let persoatq;
    let persocible;

    if(this.teamattaque==0)
    {
      persoatq = this.team1[atq];
      persocible = this.team2[cible];
    }
    else
    {
      persoatq = this.team2[atq];
      persocible = this.team1[cible];
    }

    let boost = 2;
    let malus = 0.5;
    let dmg = persoatq.dmg;
    let mult = (Math.round(Math.random()*30)+70)/100
    dmg = dmg * mult;
    mult = -1;

    let classeatq = persoatq.classe;
    let classecible = persocible.classe;

    let g1 = ["Saber","Lancer","Archer"];
    let g2 = ["Rider","Caster","Assassin"];
    let g3 = ["Alter Ego","Pretender","Foreigner"];
    let g4 = ["Ruler","Avenger","Moon Cancer"];

    if(classeatq=="Shielder"||classecible=="Shielder"){mult = 1;}
    else
    {
      if(classecible=="Berserker"||(classeatq=="Berserker"&&classecible!="Foreigner")){mult = 1.5;}
      if(classecible=="Foreigner"&&classeatq=="Berserker"){mult = 0.75;}
  
      if(classecible=="Beast"&&(g1.includes(classeatq)||g2.includes(classeatq))){mult = malus;}
      else if(classecible=="Beast"&&(g3.includes(classeatq)||g4.includes(classeatq))){mult = boost;}
  
      else if(classeatq=="Beast"&&(g1.includes(classecible)||g2.includes(classecible))){mult = boost;}
      else if(classeatq=="Beast"&&(g3.includes(classecible)||g4.includes(classecible))){mult = malus;}
    }

    if(mult==-1)
    {
      //GROUPE 1
      if(classeatq==g1[0]&&classecible==g1[1])mult=boost;
      else if(classeatq==g1[1]&&classecible==g1[0])mult=malus;

      else if(classeatq==g1[0]&&classecible==g1[2])mult=malus;
      else if(classeatq==g1[2]&&classecible==g1[0])mult=boost;

      else if(classeatq==g1[1]&&classecible==g1[2])mult=boost;
      else if(classeatq==g1[2]&&classecible==g1[1])mult=malus;
      //GROUPE 2
      else if(classeatq==g2[0]&&classecible==g2[1])mult=boost;
      else if(classeatq==g2[1]&&classecible==g2[0])mult=malus;

      else if(classeatq==g2[0]&&classecible==g2[2])mult=malus;
      else if(classeatq==g2[2]&&classecible==g2[0])mult=boost;

      else if(classeatq==g2[1]&&classecible==g2[2])mult=boost;
      else if(classeatq==g2[2]&&classecible==g2[1])mult=malus;
      //ALTER EGO
      else if(classeatq==g3[0]&&g1.includes(classecible)) mult=malus;
      else if(classeatq==g3[0]&&g2.includes(classecible)) mult=boost;
      //PRETENDER
      else if(classeatq==g3[1]&&g1.includes(classecible)) mult=boost;
      else if(classeatq==g3[1]&&g2.includes(classecible)) mult=malus;
      //GROUPE 3
      else if(classeatq==g3[0]&&classecible==g3[1])mult=malus;
      else if(classeatq==g3[1]&&classecible==g3[0])mult=boost;

      else if(classeatq==g3[0]&&classecible==g3[2])mult=boost;
      else if(classeatq==g3[2]&&classecible==g3[0])mult=malus;

      else if(classeatq==g3[1]&&classecible==g3[2])mult=malus;
      else if(classeatq==g3[2]&&classecible==g3[1])mult=boost;
      //GROUPE 4
      else if(classeatq==g4[0]&&classecible==g4[1])mult=malus;
      else if(classeatq==g4[1]&&classecible==g4[0])mult=boost;

      else if(classeatq==g4[0]&&classecible==g4[2])mult=boost;
      else if(classeatq==g4[2]&&classecible==g4[0])mult=malus;

      else if(classeatq==g4[1]&&classecible==g4[2])mult=malus;
      else if(classeatq==g4[2]&&classecible==g4[1])mult=boost;

      else if((g1.includes(classeatq)||g2.includes(classeatq))&&classecible==g4[0])mult=malus;

      else mult = 1;
    }
    dmg = Math.round(dmg*mult);
    let cc = false;
    let ec = false;

    let rdm = Math.round(Math.random()*99);
    if(rdm<10)
    {
      cc = true;
      dmg = Math.round(dmg * 1.5);
    }
    else
    {
      rdm = Math.round(Math.random()*99);
      if(rdm<5)
      {
        ec = true;
        dmg = 0;
      }
    }

    let tmp: any;

    if(ec)
    {
      tmp = {anim:'0',pos:this.ys[cible]+20,left:this.xs2[cible],dmg:"Rate-",timer:0,color:'white',size:'40px', cc:cc, ec:ec};
    }
    else
    {
      tmp = {anim:'0',pos:this.ys[cible]+20,left:this.xs2[cible],dmg:dmg,timer:0,color:'white',size:'40px', cc:cc, ec:ec};
      if(mult>1){tmp.color='#f1da00';tmp.size='50px'}
      else if(mult<1){tmp.color='#4738ff';tmp.size='30px'}
    }

    if(this.teamattaque==1)
    {
      tmp.left=this.xs1[cible]+20;
    }
    this.dmgs.push(tmp);

    let tmpinterval = setInterval(() => {
      tmp.pos = tmp.pos - 100;
      tmp.anim='1';
      clearInterval(tmpinterval);
    },50);
    persocible.pdv = persocible.pdv - dmg;
    if(persocible.pdv<0)persocible.pdv = 0;
    return ec;
  }

  setAnimX(i:any,x:any,anim:any)
  {
    if(this.teamattaque==0)
    {
      this.team1[i].arrivex=x;
      this.team1[i].animation=anim;
    }
    else
    {
      x = x * -1;
      this.team2[i].arrivex=x;
      this.team2[i].animation=anim;
    }
  }

  setAnimX2(cible:any,x:any,anim:any,miss:any)
  {
    if(this.teamattaque==0)
    {
      x = x * -1;
      this.team2[cible].arrivex=x;
      if(anim!="endSlash")this.team2[cible].animation=anim;
      if(anim=="takedamage")
      {
        if(!miss)this.team2[cible].slash="1";
        if(!miss)this.team2[cible].negative=true;
      }
      else if(anim=="idle")
      {
        this.team2[cible].negative=false;
      }
      else if(anim=="endSlash")
      {
        this.team2[cible].slash="0";
      }
    }
    else
    {
      this.team1[cible].arrivex=x;
      if(anim!="endSlash")this.team1[cible].animation=anim;
      if(anim=="takedamage")
      {
        if(!miss)this.team1[cible].slash="1";
        if(!miss)this.team1[cible].negative=true;
      }
      else if(anim=="idle")
      {
        this.team1[cible].negative=false;
      }
      else if(anim=="endSlash")
      {
        this.team1[cible].slash="0";
      }
    }
  }

  getXaction(val:any)
  {
    let tmp = val;
    if(this.teamattaque==1)
    {
      val=val*-1;
    }
    return val;
  }

  getFightName(i:any)
  {
    return this.users.find((u:any)=>u.id==i).nom;
  }

  startCombat()
  {
    AppComponent.son.pause();
    this.musiquecombat.play();
    this.teamattaque = Math.round(Math.random());

    this.combatInterval = setInterval(() => {
      let diff = 0;

      let t1 = this.team1.filter((t:any)=>t.pdv>0).length;
      let t2 = this.team2.filter((t:any)=>t.pdv>0).length;

      if(this.teamattaque==0)
        diff=t1-t2;
      else
        diff=t2-t1;

      let rdm = Math.round(Math.random()*(99-(diff*10)));

      if(rdm>10)
      {
        this.teamattaque==1?this.teamattaque=0:this.teamattaque=1;
      }
      this.startDash();
    },2000);
  }

  launchDuel()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetPvp').subscribe(pvp=>
    {
      this.duel = pvp;
      this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetLevels?').subscribe(levels=>
      {
        this.levels = levels;

        this.state="duel";

        let team1 = pvp.find((p:any)=>p.user_id == this.id);
        let team2 = pvp.find((p:any)=>p.user_id == this.profile);

        this.titlesduel = team1.titles;
        this.titlesduel2 = team2.titles;

        this.arriveLeft = "0";
        this.arriveRight = "0";

        this.arriveState = [this.getRdm2(),this.getRdm2(),this.getRdm2(),this.getRdm2()];
        this.arriveState2 = [this.getRdm2(),this.getRdm2(),this.getRdm2(),this.getRdm2()];
        
        this.arriveInterval = setInterval(() => {
          let allinf = true;
          for(let i=0;i<4;i++)
          {
            this.arriveState[i]-=100;
            this.arriveState2[i]-=100;
            if(this.arriveState[i]>=0)allinf=false;
            if(this.arriveState2[i]>=0)allinf=false;
          }
          if(allinf)
          {
            clearInterval(this.arriveInterval);
            this.arriveInterval = setInterval(() => {
              this.startIdleInterval();
              this.startCombat();
              clearInterval(this.arriveInterval);
            },200);
          }
        },100);

        let data = JSON.parse(JSON.stringify(this.data));

        let cpt=0;
        this.team1 = team1.team.map((x:any)=>
        {
          let tmp = JSON.parse(JSON.stringify(data.find((d:any)=>d.id==x)));
          let tmplevel = this.levels.find((l:any)=>l.user_id==this.id&&l.servant_id==tmp.id);
          if(tmplevel)
          {
            tmp.ascension = tmplevel.ascension;
            tmp.niveau = tmplevel.level;
          }
          tmp.title = team1.titles[cpt++]==1;
          
          tmp.animation = "idle";
          tmp.arrivex = 0;
          tmp.negative = false;

          tmp.np = 0;
          tmp.dmg = this.getDmg(tmp);
          tmp.pdv = this.getPdv(tmp);
          tmp.pdvmax = tmp.pdv;
          return tmp;
        });

        this.team2 = team2.team.map((x:any)=>
        {
          let tmp = JSON.parse(JSON.stringify(data.find((d:any)=>d.id==x)));
          let tmplevel = this.levels.find((l:any)=>l.user_id==this.adversaire&&l.servant_id==tmp.id);
          if(tmplevel)
          {
            tmp.ascension = tmplevel.ascension;
            tmp.niveau = tmplevel.level;
          }
          tmp.title = team2.titles[cpt++]==1;
          
          tmp.animation = "idle";
          tmp.arrivex = 0;
          tmp.negative = false;

          tmp.np = 0;
          tmp.dmg = this.getDmg(tmp);
          tmp.pdv = this.getPdv(tmp);
          tmp.pdvmax = tmp.pdv;
          return tmp;
        });
        
        this.adversaire = this.profile;
        this.profile = undefined;
      });
    });
  }

  getPdv(perso:any)
  {
    let asc = 1;
    if(perso.niveau>30)asc=1.1;
    if(perso.niveau>60)asc=1.2;
    if(perso.niveau>100)asc=1.3;
    let classe = perso.classe;
    let rarete = 1+perso.level*0.3;
    if(perso.level==0) rarete = 1.5;
    let classeajoute = 1;
    if(classe=="Shielder"||classe=="Beast")
      classeajoute = 1.7;
    else if(classe=="Ruler"||classe=="Avenger"||classe=="Moon Cancer")
      classeajoute = 1.5;
    else if(classe=="Foreigner"||classe=="Pretender"||classe=="Alter Ego")
      classeajoute = 1.4;
    else if(classe=="Berserker"||classe=="Saber"||classe=="Rider")
      classeajoute = 1.2;
    else if(classe=="Lancer"||classe=="Assassin"||classe=="Archer")
      classeajoute = 1.1;
    else if(classe=="Caster")
      classeajoute = 1;
    let ajoutlevel = Math.round(Math.random()*(perso.niveau?perso.niveau:1))*40+(perso.niveau?perso.niveau:1)*70;
    let title = perso.title?Math.round(Math.random()*1000)+500:0;
    return Math.round(((((Math.round(Math.random()*200)+300)+ajoutlevel)*classeajoute)*rarete)*asc+title);
  }

  getDmg(perso:any)
  {
    let asc = 1;
    if(perso.niveau>30)asc=1.05;
    if(perso.niveau>60)asc=1.1;
    if(perso.niveau>100)asc=1.15;
    let classe = perso.classe;
    let rarete = perso.level*1.5;
    if(perso.level==0) rarete = 5;
    let classeajoute = 1;
    if(classe=="Shielder")
      classeajoute = 0.8;
    else if(classe=="Ruler")
      classeajoute = 0.9;
    else if(classe=="Avenger"||classe=="Moon Cancer")
      classeajoute = 1.1;
    else if(classe=="Foreigner"||classe=="Pretender"||classe=="Alter Ego"||classe=="Beast")
      classeajoute = 1.1;
    else if(classe=="Berserker"||classe=="Saber"||classe=="Rider")
      classeajoute = 1;
    else if(classe=="Lancer"||classe=="Assassin"||classe=="Archer")
      classeajoute = 1.1;
    else if(classe=="Caster")
      classeajoute = 1.2;
    let ajoutlevel = Math.round(Math.random()*(perso.niveau?perso.niveau/3:1))*3+(perso.niveau?perso.niveau/2:1)*7;
    let title = perso.title?Math.round(Math.random()*200)+100:0;
    return Math.round((((Math.round(Math.random()*30)+20+ajoutlevel)*classeajoute)*rarete)*asc+title);
  }

  startIdleInterval()
  {
    this.arriveLeft = "2";
    this.arriveRight = "2";
    this.idleState = [this.getRdm(),this.getRdm(),this.getRdm(),this.getRdm()];
    this.idleState2 = [this.getRdm(),this.getRdm(),this.getRdm(),this.getRdm()];

    this.idleInterval = setInterval(() => {
      for(let i=0;i<4;i++)
      {
        this.idleState[i]-=100;
        this.idleState2[i]-=100;

        let rdm = Math.round(Math.random())+1;
        let rdm2 = Math.round(Math.random())+1;

        if(this.idleState[i]==0)this.idleStateNumber[i]=rdm;
        if(this.idleState2[i]==0)this.idleStateNumber2[i]=rdm2;

        if(this.idleState[i]<-500){this.idleStateNumber[i]=0;this.idleState[i]=this.getRdm();}
        if(this.idleState2[i]<-500){this.idleStateNumber2[i]=0;this.idleState2[i]=this.getRdm();}
      }
    },100);
  }

  getSprite(perso:any)
  {
    let img = perso.sprite1;
    if(!perso.sprite1) return "./assets/images/nosprite.png";
    if(perso.ascension==1&&perso.sprite2)img = perso.sprite2;
    else if(perso.ascension==2&&perso.sprite3)img = perso.sprite3;
    else if(perso.ascension==3&&perso.sprite3)img = perso.sprite3;
    return img;
  }

  clickEnhance()
  {
    if(this.enhance==true){this.enhance=false;return;}
    this.getUserData(false);
    this.ascs = [];
    this.ce = [0,0,0,0,0];
    this.enhance=true;
  }

  addpull(nb:number)
  {
    const dataToSend = {
      bannerid:this.banner.id,
      userid:this.id,
      pull:nb
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEaddPull',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  calc(){
    let serv = this.userData;
    let score = 0;
    serv.forEach((s:any)=>{
      let main = 0;
      let second = 0;
      if(s.nom!="Craft Essence")
      {
        if(s.level==5){main=100;second=50;}
        else if(s.level==4){main=60;second=30;}
        else if(s.level==3){main=30;second=15;}
        else if(s.level==2){main=20;second=10;}
        else if(s.level==1){main=10;second=5;}
        else if(s.level==0){main=1000;second=500;}
      }
      else
      {
        if(s.level==5){main=20;second=10;}
        else if(s.level==4){main=10;second=5;}
        else if(s.level==3){main=6;second=3;}
        else if(s.level==2){main=4;second=2;}
        else if(s.level==1){main=2;second=1;}
      }
      score += main;
      let qte = s.qte - 1;
      score += second * qte;
      this.score = score;
      this.users.find((u:any)=>u.id==this.id).score = score;
      this.users.sort((a: any,b: any) => b.score - a.score);
    })
    const dataToSend = {
      id:this.id,
      qte:score
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEcalcScore',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  getData()
  {
    let data = this.userData;
    if(this.filters.length>0)
    {
      data = data.filter((d:any)=>this.filters.includes(d.classe));
    }
    if(!this.showEssences)
    {
      data = data.filter((d:any)=>d.nom!="Craft Essence");
    }
    if(this.filterSpec=="Titles")
    {
      data = data.filter((d:any)=>this.titles.includes(d.id) && d.level>3);
    }
    if(this.filterSpec=="Doublons")
    {
      data = data.filter((d:any)=>d.qte>1&&d.level>3);
    }
    if(this.filterSpec=="Servants 5*")
    {
      data = data.filter((d:any)=>d.level==5);
    }
    if(this.filterSpec=="Servants 4*")
    {
      data = data.filter((d:any)=>d.level==4);
    }  
    if(this.filterSpec=="Originaux")
    {
      data = data.filter((d:any)=>d.special);
    }
    if(this.selectServant&&this.ind!=-1&&!this.compo)
    {
      data = data.filter((d:any)=>!this.myprofile.servants.includes(d.id));
    }
    if(this.selectServant&&this.ind!=-1&&this.compo)
    {
      data = data.filter((d:any)=>!this.myprofile.compo.includes(d.id));
    }
    if(this.recherche!="")
    {
      let regexp = new RegExp('.*'+this.recherche.toLowerCase()+'.*');
      data = data.filter((d:any)=>d.nom.toLowerCase().match(regexp));
    }
    
    this.sorting(data);
    return data;
  }

  clickMenu()
  {
    this.filterSpec = "";
    this.selectServant = false;
    this.showEssences = false;
    this.notPulled = false;
    this.succesOpen=false;
    this.createVente=false;
    this.filters=[];
    this.recherche='';
    this.selectedServ=undefined;
    this.playButton();
  }

  changeProfile(id:any)
  {
    this.selectServant = false;
    this.setProfile(this.id);
    if(this.ind==-1)
    {
      this.myprofile.servant = this.data.find((d:any)=>d.id==id);
      const dataToSend = {
        id:this.id,
        servantid:id,
        titleserv:this.titles.includes(id)?1:0
      }
      from(
        fetch(
          'https://www.chiya-no-yuuki.fr/FATEpicProfile',
          {
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'no-cors',
          }
        )
      );
    }
    else
    {
      let tmp = this.data.find((d:any)=>d.id==id);
      let servantstosend = "[";
      let titletosend = "[";

      if(this.compo)
      {
        if(this.myprofile.compo.length<4)
        {
          this.myprofile.comp.push(tmp);
          this.myprofile.compo.push(id);
          this.myprofile.titlescompo.push(this.titles.includes(id)&&tmp.level>3?1:0);
        }
        else
        {
          this.myprofile.compo[this.ind] = id;
          this.myprofile.comp[this.ind]=this.data.find((d:any)=>d.id==id);
          this.myprofile.titlescompo[this.ind] = this.titles.includes(id)&&tmp.level>3?1:0;
        }
        this.myprofile.compo.forEach((p:any) => servantstosend+=(p)+",");
        servantstosend=servantstosend.substring(0,servantstosend.length-1) + "]";

        this.myprofile.titlescompo.forEach((p:any) => titletosend+=(p)+",");
        titletosend=titletosend.substring(0,titletosend.length-1) + "]";

        const dataToSend = {
          id:this.id,
          compo:servantstosend,
          titlescompo:titletosend
        }
        from(
          fetch(
            'https://www.chiya-no-yuuki.fr/FATEcompoProfile',
            {
              body: JSON.stringify(dataToSend),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              mode: 'no-cors',
            }
          )
        );

        const dataToSend2 = {
          id:this.id,
          compo:servantstosend,
          titlescompo:titletosend
        }
        from(
          fetch(
            'https://www.chiya-no-yuuki.fr/FATEcompoProfile',
            {
              body: JSON.stringify(dataToSend2),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              mode: 'no-cors',
            }
          )
        );
      }
      else
      {
        if(this.myprofile.servs.length<10)
        {
          this.myprofile.servs.push(tmp);
          this.myprofile.servants.push(id);
          this.myprofile.titleservs.push(this.titles.includes(id)&&tmp.level>3?1:0);
        }
        else
        {
          this.myprofile.servants[this.ind] = id;
          this.myprofile.servs[this.ind]=this.data.find((d:any)=>d.id==id);
          this.myprofile.titleservs[this.ind] = this.titles.includes(id)&&tmp.level>3?1:0;
        }
        this.myprofile.servants.forEach((p:any) => servantstosend+=(p)+",");
        servantstosend=servantstosend.substring(0,servantstosend.length-1) + "]";

        this.myprofile.titleservs.forEach((p:any) => titletosend+=(p)+",");
        titletosend=titletosend.substring(0,titletosend.length-1) + "]";

        const dataToSend = {
          id:this.id,
          servants:servantstosend,
          titleservs:titletosend
        }
        from(
          fetch(
            'https://www.chiya-no-yuuki.fr/FATEpicsProfile',
            {
              body: JSON.stringify(dataToSend),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              mode: 'no-cors',
            }
          )
        );
      }
    }
  }
  
  getNoData()
  {
    if(this.selectServant) return [];
    let data = this.data;
    data = data.filter((d:any)=>!this.userData.find((e:any)=>e.id==d.id));

    if(this.filters.length>0)
    {
      data = data.filter((d:any)=>this.filters.includes(d.classe));
    }
    if(!this.showEssences)
    {
      data = data.filter((d:any)=>d.nom!="Craft Essence");
    }
    if(this.notPulled)
    {
      data = data.filter((d:any)=>!this.allTitles.includes(d.id)&&d.level>3);
    }
    if(this.filterSpec=="Servants 5*")
    {
      data = data.filter((d:any)=>d.level==5);
    }
    if(this.filterSpec=="Servants 4*")
    {
      data = data.filter((d:any)=>d.level==4);
    }
    if(this.filterSpec=="Originaux")
    {
      data = data.filter((d:any)=>d.special);
    }

    if(this.recherche!="")
    {
      let regexp = new RegExp('.*'+this.recherche.toLowerCase()+'.*');
      data = data.filter((d:any)=>d.nom.toLowerCase().match(regexp));
    }

    this.sorting(data);
    return data;
  }

  isNoData()
  {
    return this.getNoData().find((d:any)=>d.id==this.selectedServ.id)!=undefined;
  }

  filter(filter:string)
  {
    if(this.filters.includes(filter))
    {
      this.filters.splice(this.filters.indexOf(filter),1);
    }
    else
    {
      this.filters.push(filter);
    }
  }

  includesFilter(filter:string){
    return !this.filters.includes(filter);
  }

  sorting(data:any)
  {
    data.sort((a: any,b: any) => 
    {
      if(this.getServLevel2(b)>this.getServLevel2(a))
        {
          return 1;
        }
        else if(this.getServLevel2(b)<this.getServLevel2(a))
        {
          return -1;
        }
        else
        {
          if(b.level>a.level)
          {
            return 1;
          }
          else if(b.level<a.level)
          {
            return -1;
          }
          else
          {
            return a.nom > b.nom;
          }
        }
    });
  }

  
  getSellServant()
  {
    let data:any;
    if(!this.persoToSell) data = this.getData().filter((d:any)=>(d.level>3||d.level==0)&&d.nom!="Craft Essence");
    else data = this.data.filter((d:any)=>d.nom!="Craft Essence");
    let regexp = new RegExp('.*'+this.recherche.toLowerCase()+'.*');
    if(this.recherche!="")data = data.filter((d:any)=>d.nom.toLowerCase().match(regexp));
    this.sorting(data);
    return data;
  }

  cantSellServant(id:any)
  {
    return this.cantSell.includes(id);
  }

  clickSellPerso(servant:any)
  {
    if(this.persoToSell)this.persoToExchange = servant;
    if(!this.persoToSell)
    {
      this.persoToSell = servant;
      if(this.titles.includes(this.persoToSell.id))
      {
        if(servant.qte==1)
        {
          this.sellWithTitle = true;
        }
        else
        {
          this.sellWithTitle = false;
        }
      }
      else
      {
        this.sellWithTitle = false;
      }
    }
  }

  disableTitleToggle()
  {
    if(!this.titles.includes(this.persoToSell.id))return true;
    if(this.persoToSell.qte==1)return true;
    return false;
  }

  isTitleSellToggable2()
  {
    return this.persoToExchange.level>3;
  }

  isDisabledSell()
  {
    if(this.sellType=="quartz")
    {
      if(!this.sellQuartz.match(/^[0-9]+$/) || parseInt(this.sellQuartz)>9999 || parseInt(this.sellQuartz)<0)
        return true;
    }
    else if(!this.persoToExchange)
    {
      return true;
    }
    else if(this.persoToSell.id==this.persoToExchange.id&&this.sellWithTitle==this.exchangeWithTitle)
    {
      return true;
    }
    return false;
  }

  sellServant()
  {
    const dataToSend = {
      USERID:this.id,
      SERVANTID:this.sellWithTitle?-1:this.persoToSell.id,
      SERVANTIDWITHTITLE:!this.sellWithTitle?-1:this.persoToSell.id,
      PRICEQUARTZ:this.sellType=="quartz"?parseInt(this.sellQuartz):-1,
      PRICESERVANTID:this.sellType=="trade"&&!this.exchangeWithTitle?this.persoToExchange.id:-1,
      PRICESERVANTIDWITHTITLE:this.sellType=="trade"&&this.exchangeWithTitle?this.persoToExchange.id:-1,
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEsell',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe(x=>{
      this.refreshBoutique();
      this.createVente = false;
    });
  }

  cancelSell(id:any)
  {
    const dataToSend = {
      id:id,
      userid:this.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEcancelSell',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe(x=>{
      this.refreshBoutique();
    });
  }

  buyServ2(sell:any)
  {
    let servid1 = -1;
        if(sell.servantPrice)servid1=sell.servantPrice.id;
        else if(sell.servantPriceWithTitle)servid1=sell.servantPriceWithTitle.id;
        let servid2 = -1;
        if(sell.servant)servid2=sell.servant.id;
        else if(sell.servantWithTitle)servid2=sell.servantWithTitle.id;

        this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetSellData?id1='+this.id+'&id2='+sell.user_id+'&servid1='+servid1+'&servid2='+servid2).subscribe(data=>
        {
          if(sell.servantPriceWithTitle&&sell.servant&&sell.price_servant_id_with_title==sell.servant_id)
          {
            this.swapTitle(this.id,sell.servant,sell.user_id,false);
          }
          else if(sell.servantPrice&&sell.servantWithTitle&&sell.price_servant_id==sell.servant_id_with_title)
          {
            this.swapTitle(sell.user_id,sell.servantWithTitle,this.id,false);
          }
          else
          {
            if(sell.price_quartz==-1)this.venteServ(sell,data);
            this.donServ(sell,data);
          }
          
          this.majInterval = setInterval(() => {
            this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetUser?nom=' + this.pseudo + '&mdp=' + this.mdp).subscribe(data=>
            {
                this.user = data[0];
                this.quartz = data[0].quartz;
                this.id = data[0].id;
                this.score = data[0].score;
                this.getUserData(true);
                this.getTitles();
                this.calc();
            });
            clearInterval(this.majInterval);
        },300);
        });
  }

  getLimit()
  {
    let tmp = this.getServLevel();
    let limit = 99;
    if(tmp<=30)limit = 30;
    else if(tmp<=60) limit = 60;
    return limit;
  }

  addCe(i:number,nb:number,qte:number)
  {
    let limit = this.getLimit();

      if(this.getLevel()>=limit&&nb>0)return;
      if(this.ce[i]+nb>-1&&this.ce[i]+nb<qte+1)
        this.ce[i] += nb;
    
  }

  getCeValue(i:number)
  {
    return this.ce[i];
  }

  venteServ(sell:any,data:any)
  {
    //SERVANT CONTRE SERVANT PRIX
    if(sell.servantPrice)
    {
      let idqte = data.find((d:any)=>d.servant_id==sell.servantPrice.id&&d.user_id==this.id).qte;
      //ID SERVANT = 1
      if(idqte==1)
      {
        this.removeServant(this.id,sell.servantPrice);
      }
      //ID SERVANT > 1
      else
      {
        this.addServant(this.id,sell.servantPrice,-1);
      }
      this.addServant(sell.user_id,sell.servantPrice,1);
    }
    //SERVANT CONTRE TITRE PRIX
    else
    {
      let idqte = data.find((d:any)=>d.servant_id==sell.servantPriceWithTitle.id&&d.user_id==this.id).qte;
      let sellqte = data.find((d:any)=>d.servant_id==sell.servantPriceWithTitle.id&&d.user_id==sell.user_id);
      //ID TITRE = 1
      if(idqte==1)
      {
        //SELL TITRE > 0
        if(sellqte)
        {
          this.swapTitle(this.id,sell.servantPriceWithTitle,sell.user_id,true);
          this.addServant(sell.user_id,sell.servantPriceWithTitle,1);
        }
        //SELL TITRE = 0
        else
        {
          const dataToSend = {
            userid:sell.user_id,
            servantid:sell.servantPriceWithTitle.id,
            level:sell.servantPriceWithTitle.level,
            qte:1
          }
          from(
            fetch(
              'https://www.chiya-no-yuuki.fr/FATEaddServant',
              {
                body: JSON.stringify(dataToSend),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                mode: 'no-cors',
              }
            )
          ).subscribe(d=>{
            this.swapTitle(this.id,sell.servantPriceWithTitle,sell.user_id,true);
          });
        }
      } 
      //ID TITRE > 1
      else
      {
        //SELL TITRE > 0
        if(sellqte)
        {
          this.swapTitle(this.id,sell.servantPriceWithTitle,sell.user_id,false);
          this.addServant(sell.user_id,sell.servantPriceWithTitle,1);
          this.addServant(this.id,sell.servantPriceWithTitle,-1);
        }
        //SELL TITRE = 0
        else
        {
          const dataToSend = {
            userid:sell.user_id,
            servantid:sell.servantPriceWithTitle.id,
            level:sell.servantPriceWithTitle.level,
            qte:1
          }
          from(
            fetch(
              'https://www.chiya-no-yuuki.fr/FATEaddServant',
              {
                body: JSON.stringify(dataToSend),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                mode: 'no-cors',
              }
            )
          ).subscribe(d=>{
            this.swapTitle(this.id,sell.servantPriceWithTitle,sell.user_id,false);
            this.addServant(this.id,sell.servantPriceWithTitle,-1);
          });
        }
      }
    }
  }

  donServ(sell:any,data:any)
  {
    //SERVANT CONTRE SERVANT DON
    if(sell.servant)
    {
      let sellqte = data.find((d:any)=>d.servant_id==sell.servant.id&&d.user_id==sell.user_id).qte;
      //SELL SERVANT = 1
      if(sellqte==1)
      {
        this.removeServant(sell.user_id,sell.servant);
        this.addServant(this.id,sell.servant,1);
      }
      //SELL SERVANT > 1
      else
      {
        this.addServant(sell.user_id,sell.servant,-1);
        this.addServant(this.id,sell.servant,1);
      }
    }
    //TITRE CONTRE SERVANT DON
    else
    {
      let idqte = data.find((d:any)=>d.servant_id==sell.servantWithTitle.id&&d.user_id==this.id);
      let sellqte = data.find((d:any)=>d.servant_id==sell.servantWithTitle.id&&d.user_id==sell.user_id).qte;
      //SELL QTE = 1
      if(sellqte==1)
      {
        //ID QTE > 0
        if(idqte)
        {
          this.swapTitle(sell.user_id,sell.servantWithTitle,this.id,true);
          this.addServant(this.id,sell.servantWithTitle,1);
        }
        //ID QTE = 0
        else
        {
          const dataToSend = {
            userid:this.id,
            servantid:sell.servantWithTitle.id,
            level:sell.servantWithTitle.level,
            qte:1
          }
          from(
            fetch(
              'https://www.chiya-no-yuuki.fr/FATEaddServant',
              {
                body: JSON.stringify(dataToSend),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                mode: 'no-cors',
              }
            )
          ).subscribe(d=>{
            this.swapTitle(sell.user_id,sell.servantWithTitle,this.id,true);
          });
        }
      }
      //SELL QTE > 1
      else
      {
        //ID QTE > 0
        if(idqte)
        {
          this.addServant(sell.user_id,sell.servantWithTitle,-1);
          this.swapTitle(sell.user_id,sell.servantWithTitle,this.id,false);
          this.addServant(this.id,sell.servantWithTitle,1);
        }
        //ID QTE = 0
        else
        {
          const dataToSend = {
            userid:this.id,
            servantid:sell.servantWithTitle.id,
            level:sell.servantWithTitle.level,
            qte:1
          }
          from(
            fetch(
              'https://www.chiya-no-yuuki.fr/FATEaddServant',
              {
                body: JSON.stringify(dataToSend),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                mode: 'no-cors',
              }
            )
          ).subscribe(d=>{
            this.swapTitle(sell.user_id,sell.servantWithTitle,this.id,false);
            this.addServant(sell.user_id,sell.servantWithTitle,-1);
          });
        }
      }
    }
  }

  swapTitle(donnetitre:any, servant:any, recoitTitre:any, remove:boolean)
  {
    const dataToSend = {
      givetitle:donnetitre,
      servantid:servant.id,
      gettitle:recoitTitre
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEswapTitle',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe(d=>{
      if(remove)
      {
        this.removeServant(donnetitre,servant);
      }
      else
      {
        this.removeTitle(donnetitre,servant);
      }
    });
  }

  removeTitle(donnetitre:any, servant:any)
  {
    const dataToSend = {
      buyerid:donnetitre,
      servantid:servant.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEremoveTitle',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  swapServant(buyerid:any, servant:any, sellerid:any)
  {
    const dataToSend = {
      buyerid:buyerid,
      servantid:servant.id,
      sellerid:sellerid
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEswapServant',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }

  refreshBoutique()
  {
    this.getUserData(false);
    this.getShop();
  }

  buyServ(sell:any)
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetUserData?id=' + this.id).subscribe(data=>
    {
      let priceid = -1;
      let title = sell.price_servant_id_with_title!=-1;

      if(sell.price_servant_id!=-1) priceid = sell.price_servant_id;
      if(sell.price_servant_id_with_title!=-1) priceid = sell.price_servant_id_with_title;

      if(sell.quartz!=-1)
      {
        this.buyServ3(sell);
      }
      else if(data.find((d:any)=>d.servantid==priceid))
      {
        if(title && this.titles.find((t:any)=>t==priceid))
        {
          this.buyServ3(sell);
        }
        else if(!title)
        {
          this.buyServ3(sell);
        }
        else
        {
          this.refreshBoutique();
        }
      }
    });
  }

  buyServ3(sell:any)
  {
    const dataToSend = {
      id:sell.id,
      userid:this.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEbuyServ',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    ).subscribe(x=>{
      this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEshop').subscribe(data=>
      {
        this.shop = data.map((x:any)=>
        {
          let tmp = x;
          if(x.servant_id_with_title!=-1)tmp.servantWithTitle = this.data.find((y:any)=>y.id==x.servant_id_with_title);
          if(x.servant_id!=-1)tmp.servant = this.data.find((y:any)=>y.id==x.servant_id);
          if(x.price_servant_id!=-1)tmp.servantPrice = this.data.find((y:any)=>y.id==x.price_servant_id);
          if(x.price_servant_id_with_title!=-1)tmp.servantPriceWithTitle = this.data.find((y:any)=>y.id==x.price_servant_id_with_title);
          return tmp;
        });
        if(data.find((d:any)=>d.id==sell.id&&d.bought_user_id==this.id))
        {
          if(sell.price_quartz!=-1)
          {
            let qte = sell.price_quartz;
            this.spendQuartz(qte);
            const dataToSend = {
              nom:sell.nom,
              qte:(qte*-1)
            }
            from(
              fetch(
                'https://www.chiya-no-yuuki.fr/FATEspendQuartz',
                {
                  body: JSON.stringify(dataToSend),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                  mode: 'no-cors',
                }
              )
            )
          }
          this.buyServ2(sell);
        }
      });
    });
  }

  lessThan100()
  {
    let tmp = this.levels.find((l:any)=>l.user_id == this.id && l.servant_id == this.selectedServ.id);
    return !tmp||tmp.level<100;
  }

  moreThan30()
  {
    let level = this.getServLevel();
    return level>30;
  }

  changeAsc()
  {
    this.ascs=[];
    this.enhance = false;
    this.ascs.push(this.selectedServ.img1);
    if(this.selectedServ.img2)
      this.ascs.push(this.selectedServ.img2);
    if(this.selectedServ.img3)
      this.ascs.push(this.selectedServ.img3);
    if(this.selectedServ.img4)
      this.ascs.push(this.selectedServ.img4);
  }

  removeServant(userid:any,perso:any)
  {
    const dataToSend = {
      userid:userid,
      servantid:perso.id
    }
    from(
      fetch(
        'https://www.chiya-no-yuuki.fr/FATEremoveServ',
        {
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      )
    );
  }
}
