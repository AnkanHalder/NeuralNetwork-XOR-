function sigmoid(x){
    return(1/(1+Math.exp(-x)));
}

function dsigmaoid(y){
    return y*(1-y);
}

class NeuralNetwork{

    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes =input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.lr=.1;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h=new Matrix(this.hidden_nodes,1);
        this.bias_o=new Matrix(this.output_nodes,1);
        this.bias_h.randomize();
        this.bias_o.randomize();


    }

    feedforward(input_array){

        let input=Matrix.fromArray(input_array);
        let hidden= Matrix.multiplyMatrix(this.weights_ih,input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let output=Matrix.multiplyMatrix(this.weights_ho,hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();

    }

    train(inputs,targets){

        let input = Matrix.fromArray(inputs);
        let hidden = Matrix.multiplyMatrix(this.weights_ih, input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let output = Matrix.multiplyMatrix(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        targets=Matrix.fromArray(targets);
        //Error calculation
        // console.log('Outputs ');
        // console.table(output.data);
        // console.log('Targets ');
        // console.table(targets.data);

        //Subtract
        let errors=Matrix.subtract(targets,output);
        // console.log('Errors ');
        // console.table(errors.data);

        //Grad
        //let gradient =output*(1-output);
        let gradients=Matrix.map(output,dsigmaoid);
        gradients.multiply(errors);
        gradients.multiply(this.lr);


        let hidden_T=Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiplyMatrix(gradients, hidden_T);


        //adjust by deltas
        this.weights_ho.add(weight_ho_deltas);
        this.bias_o.add(gradients);

        //Errorsfeed
        let weights_ho_transpose=Matrix.transpose(this.weights_ho);
        let hidden_errors=Matrix.multiplyMatrix(weights_ho_transpose,errors);
        // console.log('Hidden Errors ');
        // console.table(hidden_errors.data);
        //return errors;

        //last Layer
        let hidden_gradient=Matrix.map(hidden,dsigmaoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.lr);
        let inputs_T = Matrix.transpose(input);
        let weight_ih_deltas = Matrix.multiplyMatrix(hidden_gradient,inputs_T);

        this.weights_ih.add(weight_ih_deltas);
        this.bias_h.add(hidden_gradient);
    }
}