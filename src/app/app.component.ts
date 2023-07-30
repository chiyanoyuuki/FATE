import { Component, OnInit } from '@angular/core';
import DATA from '../assets/data.json';
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

  public vid: any;
  public load: boolean = false;
  public persosToInvoq: any[] = [];
  public perso4: any;
  public persos4: any[] = [];
  public perso5: any;
  public persos5: any[] = [];
  public data: any = DATA;
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

  public static revealed: boolean = false;
  public static perso: any;
  public static show: boolean = false;
  public static interval: any;

  public createVente = false;

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

  testTirages()
  {
    let tirages = 100000;
    let data = [0,0,0,0,0,0,0,0,0,0,0];
    for(let i=0;i<tirages;i++)
    {
      let perso = this.persosToInvoq.shift();
      this.loadPerso();
      if(perso==this.perso5)data[0]++;
      else if(perso==this.perso4)data[1]++;
      else if(this.persos5.includes(perso))data[2]++;
      else if(this.persos4.includes(perso))data[3]++;
      else if(perso.nom!="Craft Essence" && perso.level==5)data[4]++;
      else if(perso.nom!="Craft Essence" && perso.level==4)data[5]++;
      else if(perso.nom!="Craft Essence" && perso.level==3)data[6]++;
      else if(perso.nom!="Craft Essence" && perso.level==2)data[7]++;
      else if(perso.nom!="Craft Essence" && perso.level==1)data[8]++;
      else if(perso.nom!="Craft Essence" && perso.level==0)data[9]++;
      else data[10]++;
    }
    console.log("Sur "+tirages+" tirages :");
    console.log("Perso super boosté 5* : "+data[0]);
    console.log("Perso super boosté 4* : "+data[1]);
    console.log("Perso boosté parmis les 10 5* : "+data[2]);
    console.log("Perso boosté parmis les 10 4* : "+data[3]);
    console.log("Perso aléatoire 5* : "+data[4]);
    console.log("Perso aléatoire 4* : "+data[5]);
    console.log("Perso aléatoire 3* : "+data[6]);
    console.log("Perso aléatoire 2* : "+data[7]);
    console.log("Perso aléatoire 1* : "+data[8]);
    console.log("Perso aléatoire 0* : "+data[9]);
    console.log("Craft Eseence : "+data[10]);
  }

  public daily()
  {
    let date = new Date(this.user.daily);
    let now = new Date(Date.now());
    if(date.getDate()!=now.getDate())
    {
      this.spendQuartz(-30);
    }
    let time = (23-now.getHours())*1000*60*60+(59-now.getMinutes())*1000*60+(60-now.getSeconds())*1000;
    this.timerInterval = setInterval(() => {
      this.spendQuartz(-30);
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.spendQuartz(-30);
    },1000*60*60*24);
  },time);
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
    this.saveBanner();
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
    return this.quartz<nb*3;
  }

  startSummon(nb:number)
  {
    if(this.quartz<nb*3)
    {
      return;
    }
    this.sonbtn.play();
    this.spendQuartz(nb*3);
    for(let i=0;i<nb;i++)
    {
      this.addServant(this.persosToInvoq[i]);
    }
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
      let rdm2 = Math.floor(Math.random()*3);
      if(rdm2==0){this.video = "rainbow";}
      else if(rdm2==1){this.video = "gold";}
      else if(rdm2==2){this.video = "3star";}
    }
    else if(AppComponent.perso.level==4)
    {
      let rdm2 = Math.floor(Math.random()*2);
      if(rdm2==0){this.video = "gold";}
      else if(rdm2==1){this.video = "3star";}
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
    

    //this.testTirages();
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

  getImage(){
      return AppComponent.perso && AppComponent.perso.img1;
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
        this.getTitles();
        this.getShop();
        this.state = "banner";
        AppComponent.son.play();
        this.timerQuartz = 400000;
        this.daily();
      }
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

  got(quartz:number,servant:any)
  {
    if(quartz!=-1)
    {
      return this.quartz>=quartz;
    }
    else
    {
      let tmp = this.getData();
      return tmp.find((d:any)=>d.id==servant.id);
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
      shop = shop.filter((s:any)=>s.servantPrice&&s.nom!=this.user.nom);
    }

    if(this.filterSellAvailable)
    {
      shop = shop.filter((s:any)=>this.got(s.price_quartz,s.servantPrice)&&s.nom!=this.user.nom);
    }

    if(this.recherche!="")
    {
      let regexp = new RegExp('.*'+this.recherche.toLowerCase()+'.*');
      shop = this.shop.filter((s:any)=>
        s.nom.toLowerCase().match(regexp) ||
        s.servant.nom.toLowerCase().match(regexp) ||
        (s.servantPrice && s.servantPrice.nom.toLowerCase().match(regexp))
      );
    }
    shop.sort((a: any,b: any) => 
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
    return this.titles.includes(serv.id) || (serv.level < 4&&serv.nom!="Craft Essence");
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

    console.log(jours,heures,minutes,secondes);
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
    if(qte==-30)
    {
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
      this.shop = data.map((x:any)=>
      {
        let tmp = x;
        tmp.servant = this.data.find((y:any)=>y.id==x.servant_id);
        if(tmp.price_servant_id!=-1)tmp.servantPrice = this.data.find((y:any)=>y.id==x.price_servant_id);
        return tmp;
      });
    });
  }

  addServant(perso:any)
  {
    let nb: number = parseInt(perso.id);
    const dataToSend = {
      userid:this.id,
      servantid:perso.id,
      level:perso.level
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
      this.loadPersos();
    });
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
        else if(s.level==1){main=10;second=50;}
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
    if(this.recherche!="")
    {
      let regexp = new RegExp('.*'+this.recherche.toLowerCase()+'.*');
      data = data.filter((d:any)=>d.nom.toLowerCase().match(regexp));
    }
    
    this.sorting(data);
    return data;
  }
  
  getNoData()
  {
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
    });
  }
}
