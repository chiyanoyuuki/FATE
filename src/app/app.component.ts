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
  public ce: number[] = [0,0,0,0,0,0];
  public ascs: any[] = [];

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
    let tmp = this.levels.find((l:any)=>l.servant_id == this.selectedServ.id);
    if(tmp)level = tmp.level;
    return level;
  }

  getServLevel2(perso:any)
  {
    let level = 0;
    let tmp = this.levels.find((l:any)=>l.servant_id == perso.id);
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
    let tmp = this.levels.find((l:any)=>l.servant_id == this.selectedServ.id);
    if(tmp)level = tmp.level;
    level = level + this.ce[0]*1+this.ce[1]*2+this.ce[2]*3+this.ce[3]*4+this.ce[4]*5+this.ce[5]*20;
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
    let tmp = this.levels.find((l:any)=>l.servant_id == this.selectedServ.id);
    if(tmp)level = tmp.level;
    if(level==limit)return true;
    return false;
  }

  getMore()
  {
    return this.ce[0]*1+this.ce[1]*2+this.ce[2]*3+this.ce[3]*4+this.ce[4]*5+this.ce[5]*20;
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
    let serv = this.userData.find((u:any)=>u.id==this.selectedServ.id);
    tmp.push(serv);
    return tmp;
  }

  getBack(){
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
      }
    });
  }

  getLevels()
  {
    this.http.get<any>('https://www.chiya-no-yuuki.fr/FATEgetLevels?id=' + this.id).subscribe(data=>
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

    shop.sort((a: any,b: any) => 
    {
      if(a.servant&&b.servant)
      {
        if(b.servant.level>a.servant.level)
        {
          return 1;
        }
        else if(b.servant.level<a.servant.level)
        {
          return -1;
        }
        else
        {
          return a.servant.nom > b.servant.nom;
        }
      }
      else if(a.servant)
      {
        if(b.servantWithTitle.level>a.servant.level)
        {
          return 1;
        }
        else if(b.servantWithTitle.level<a.servant.level)
        {
          return -1;
        }
        else
        {
          return a.servant.nom > b.servantWithTitle.nom;
        }
      }
      else if(b.servant)
      {
        if(b.servant.level>a.servantWithTitle.level)
        {
          return 1;
        }
        else if(b.servant.level<a.servantWithTitle.level)
        {
          return -1;
        }
        else
        {
          return a.servantWithTitle.nom > b.servant.nom;
        }
      }
      else
      {
        if(b.servantWithTitle.level>a.servantWithTitle.level)
        {
          return 1;
        }
        else if(b.servantWithTitle.level<a.servantWithTitle.level)
        {
          return -1;
        }
        else
        {
          return a.servantWithTitle.nom > b.servantWithTitle.nom;
        }
      }
      
    });
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
    this.quartz-=qte;
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
    );
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
    this.selectServant=true;
    this.state='formation';
    if(i==-1)this.filterSpec="Titles";
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
        if(!p.titleservs||p.titleservs == null) p.titleservs = [];
      });
      if(!this.profiles.find((p:any)=>p.user_id==this.id))
      {
        let prof = {user_id:this.id,servant_id:-1,servants:[],description:'Pas de description..',succes:[],servs:[],titleserv:-1,titleservs:[]};
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
    for(let i=0;i<6;i++)
    {
      let qte = this.ce[i];
      let serv = cartes[i];
      if(qte>0&&serv.qte-qte>0)
      {
        this.addServant(this.id,serv,qte*-1);
      }
      else if(qte>0)
      {
        this.removeServant(this.id,serv);
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
    if(tmp.level<=30)asc = 1;
    else if(tmp.level<=60)asc= 2;
    else asc = 3;
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

  clickEnhance()
  {
    if(this.enhance==true){this.enhance=false;return;}
    this.getUserData(false);
    this.ascs = [];
    this.ce = [0,0,0,0,0,0];
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

    
    if(this.selectServant&&this.ind!=-1)
    {
      data = this.userData.filter((d:any)=>!this.myprofile.servants.includes(d.id));
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

      let servantstosend = "[";
      this.myprofile.servants.forEach((p:any) => servantstosend+=(p)+",");
      servantstosend=servantstosend.substring(0,servantstosend.length-1) + "]";

      let titletosend = "[";
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
    let tmp = this.levels.find((l:any)=>l.servant_id == this.selectedServ.id);
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
