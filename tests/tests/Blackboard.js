/* BLACKBOARD ============================================================== */
suite('Blackboard', function() {
    test('Basic Read & Write operations', function() {
        var blackboard = new statejs.Blackboard();

        blackboard.set('var1', 'this is some value');
        blackboard.set('var2', 999888);

        assert.equal(blackboard.get('var1'), 'this is some value');
        assert.equal(blackboard.get('var2'), 999888);
        assert.equal(blackboard.get('var3'), undefined);
    });

    test('Tree memory initialization', function() {
        var blackboard = new statejs.Blackboard();

        blackboard.set('var1', 'value', 'tree1');

        assert.isNotUndefined(blackboard.get('var1', 'tree1'));
        assert.isNotUndefined(blackboard.get('stateMemory', 'tree1'));
    });

    test('Read & Write operations within Tree Scope', function() {
        var blackboard = new statejs.Blackboard();

        blackboard.set('var1', 'this is some value', 'tree 1');
        blackboard.set('var2', 999888, 'tree 2');

        assert.equal(blackboard.get('var1', 'tree 1'), 'this is some value');
        assert.equal(blackboard.get('var2', 'tree 2'), 999888);

        assert.equal(blackboard.get('var1', 'tree 2'), undefined);
        assert.equal(blackboard.get('var2', 'tree 1'), undefined);
    });

    test('Read & Write operations within Tree and Node Scopes', function() {
        var blackboard = new statejs.Blackboard();

        blackboard.set('var1', 'value 1', 'tree 1');
        blackboard.set('var2', 'value 2', 'tree 1', 'state 1');
        blackboard.set('var3', 'value 3', 'tree 1', 'state 2');
        blackboard.set('var4', 999888, 'tree 2');

        assert.equal(blackboard.get('var2', 'tree 1', 'state 1'), 'value 2');
        assert.equal(blackboard.get('var3', 'tree 1', 'state 2'), 'value 3');
        assert.equal(blackboard.get('var2', 'tree 1', 'state 2'), undefined);
        assert.equal(blackboard.get('var3', 'tree 1', 'state 1'), undefined);
        assert.equal(blackboard.get('var2', 'tree 1'), undefined);
        assert.equal(blackboard.get('var1', 'tree 1', 'state 1'), undefined);

        assert.equal(blackboard.get('var2', 'tree 2', 'state 1'), undefined);
    });
});
/* ========================================================================= */
