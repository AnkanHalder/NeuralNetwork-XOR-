class Matrix{

    constructor(rows,cols){
        this.rows=rows;
        this.cols=cols;
        this.data=[];

        for(let i=0;i<this.rows;i++){
            this.data[i]=[];
            for(let j=0;j<this.cols;j++){
                this.data[i][j]=0;
            }
        }
    }

    multiply(n){
        if(n instanceof Matrix){
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] *= n.data[i][j];
            }
        }
        else
        {
            for(let i=0;i<this.rows;i++){
                for (let j = 0; j < this.cols; j++) 
                    this.data[i][j]*= n;
            }
        }
    }

    add (n) {
        
        if(n instanceof Matrix){
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] += n.data[i][j];
            }
        }else
        {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++)
                    this.data[i][j] += n;
            }
        }
    }

    map(fn){
        var a;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++){
              a= this.data[i][j];
              this.data[i][j]=fn(a);
            }
        }
    }

    static map(mx,fn) {
        var a=new Matrix(mx.rows,mx.cols);
        for (let i = 0; i < mx.rows; i++) {
            for (let j = 0; j < mx.cols; j++) {
                let b = mx.data[i][j];
                a.data[i][j] = fn(b);
            }
        }
        return a;
    }

    randomize(){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] =Math.floor(Math.random()*2-1);
        }
    }

    static fromArray(arr){
        let out=new Matrix(arr.length,1);
        for(let i=0;i<arr.length;i++)
            out.data[i][0]=arr[i];
        return out;
    }

    toArray(){
        let arr=[];
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++)
            arr.push(this.data[i][j]);
        }
        return arr;
    }

    static multiplyMatrix(a,b){

        if (b instanceof Matrix && a instanceof Matrix) {
            if(a.cols === b.rows){
                 let result =new Matrix(a.rows,b.cols);
                 for(let i=0;i<result.rows;i++){
                     for(let j=0;j<result.cols;j++){
                         let sum=0;
                         for(let k=0;k<a.cols;k++)
                             sum+=a.data[i][k]*b.data[k][j];
                         result.data[i][j]=sum;
                     } 
                 }
                return result; 
            }else{
                console.log('Rows and Columns dont match');
                return undefined;
            }
        }
    }
    static transpose(obj){
        let result=new Matrix(obj.cols,obj.rows);
        for(let i=0;i<obj.rows;i++){
            for(let j=0;j<obj.cols;j++)
                result.data[j][i]+=obj.data[i][j];
        }
        return result;
    }

    static subtract(a,b){
        let result=new Matrix(a.rows,1);
        for(let i=0;i<a.rows;i++){
            result.data[i][0]=a.data[i][0]-b.data[i][0];
        }
        return result; 
    }
    
    print(){
        console.table(this.data);
    }

}