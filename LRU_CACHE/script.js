
class CDLLNode
{
    constructor(key,val)
    {
        this.key=key;
        this.val=val;
        this.next=null;
        this.prev=null;
    }
}

class CDLL{

    constructor()
    {
        this.head=null;
    }

    addAtFirst(key,val)
    {
        let nn=new CDLLNode(key,val);
        nn.next=nn;
        nn.prev=nn;
        if(this.head==null)
        {
            this.head=nn;
            return this.head;
        }
        nn.next=this.head;
        nn.prev=this.head.prev;
        this.head.prev.next=nn;
        this.head.prev=nn;
        this.head=nn;
        return this.head;

    }

    moveAtFront(x)
    {
        if(x==this.head){
            return this.head;
        }
        x.prev.next=x.next;
        x.next.prev=x.prev;

        x.next=this.head;
        x.prev=this.head.prev;
        this.head.prev.next=x;
        this.head.prev=x;
        this.head=x;
        return this.head;
    }

    deleteAtEnd()
    {
        if(this.head==null) return null;
        let last=this.head.prev;
        if(last==this.head){
            this.head=null;
            return last;
        }
        let slast=last.prev;
        slast.next=this.head;
        this.head.prev=slast;
        return last;
    }

   
}

class LRU{
    constructor(capacity)
    {
        this.capacity=capacity;
        this.size=0;
        this.map=new Map();
        this.cd=new CDLL();
    }

    put(key,val){
        if(this.map.has(key))
        {
            this.map.get(key).val=val;
            this.cd.moveAtFront(this.map.get(key));
        }
        else if(this.size<this.capacity)
        {
            let x=this.cd.addAtFirst(key,val);
            this.size++;
            this.map.set(key,x);
        }
        else
        {
            let x=this.cd.deleteAtEnd();
            this.map.delete(x.key);
            let y=this.cd.addAtFirst(key,val);
            this.map.set(key,y);
        }
        updateCacheDisplay();
    }

    get(key)
    {
        if(this.map.has(key)){
            this.cd.moveAtFront(this.map.get(key));
            updateCacheDisplay();
        }
        else alert("Key Not Found");
    }
    getEntries()
    {
        let arr=[];
        let ptr=this.cd.head;
        if(ptr!=null) {
        arr.push([ptr.key,ptr.val]);
        ptr=ptr.next;
        while(ptr!=this.cd.head)
            {
                arr.push([ptr.key,ptr.val]);
                ptr=ptr.next;
            } 
        }
        return arr;
    }
}
let x=prompt("Enter the Capacity of Cache: ");
const lr1=new LRU(x);

function put()
{
    console.log("hi");
    let key=document.getElementById("key").value.trim();
    let val=document.getElementById("value").value.trim();
    lr1.put(key,val);
}

function get()
{
    let key=document.getElementById("key").value.trim();
    lr1.get(key);
}
function updateCacheDisplay()
{
    let cachecontainer=document.getElementById("cache-display");
    cachecontainer.innerHTML="";
    let arr=lr1.getEntries();
    arr.forEach(([key,value],index) => {
        let cacheitem=document.createElement("div");
        cacheitem.classList.add("cache-item");
        cacheitem.textContent=`${key} : ${value}`;
        if(index==0) 
        {
            cacheitem.classList.add("highlight")
           setTimeout(()=>cacheitem.classList.remove("highlight"),500);
        }
        cachecontainer.appendChild(cacheitem);
    });
    let cont=document.getElementById("label");
    cont.innerHTML="";
    let div1=document.createElement("div");
    let label1=document.createElement("span");
    label1.innerText="MRU";
    let label2=document.createElement("span")
    label2.innerText="LRU";
    div1.appendChild(label1);
    div1.appendChild(label2);
    div1.classList.add("label");
    cont.appendChild(div1);

}