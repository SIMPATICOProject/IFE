(function (window, undefined) {

    // Use different namespace to avoid name conflicts with the EditorFrame object from the outside frame (the editor)
    // NB: Cannot use Granite.author.page since it is already used (and deprecated)

    /**
     *
     * @namespace Granite.author.inner
     * The namespace of the content frame; i.e., where the actual content to be edited lives
     */
    Granite.author.inner = {};

    /**
     * The "inner" EditorFrame is the object that we use on the content frame side to send messages to the editor frame
     */
    Granite.author.inner.EditorFrame = new Granite.author.MessageChannel('cqauthor', /* target */ window.parent).mixin({});

}(this));