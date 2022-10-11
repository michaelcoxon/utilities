import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';

export interface ITree<T>
{
    readonly root: ITreeNode<T>;
}

interface ITreeNode<T>
{
    weight: number;
    value: T;
    children: ITreeNode<T>[];
}

export class Tree<T> implements ITree<T>
{
    #root: ITreeNode<T>;

    constructor(root: ITreeNode<T>)
    {
        this.#root = root;
    }

    get root(): ITreeNode<T>
    {
        return this.#root;
    }

    get weight(): number
    {
        const context: ISumNodeWeightsContext = {
            sum: 0,
            count: 0,
        };
        sumNodeWeights(this.#root, context);

        return context.sum / context.count;
    }
}

interface ISumNodeWeightsContext
{
    sum: number;
    count: number;
}

function sumNodeWeights<T>(node: ITreeNode<T>, context: ISumNodeWeightsContext): void
{
    if (isUndefinedOrNull(node))
    {
        return;
    }
    context.count++;
    context.sum += node.weight * Math.pow(2, context.count);

    for (const child of node.children)
    {
        sumNodeWeights(child, context);
    }
}
